import fs from "node:fs"
import path from "node:path"
import ts from "typescript"

/**
 * @param {import("plop").NodePlopAPI} plop
 */
export default function plopfile(plop) {
  plop.setHelper("json", (value) => JSON.stringify(value, null, 2))
  plop.setHelper("eq", (a, b) => a === b)
  plop.setHelper("hasItems", (value) => Array.isArray(value) && value.length > 0)
  plop.setHelper("arrayLiteral", (value) => {
    if (!Array.isArray(value)) return "[]"
    const quoted = value.map((item) => `"${item}"`).join(", ")
    return `[${quoted}]`
  })
  plop.setActionType("removePath", (answers, config, { renderString }) => {
    const target = renderString(config.path, answers)
    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true })
      return `removed ${target}`
    }
    return `skipped ${target} (not found)`
  })

  plop.setHelper("inferStoryCategory", (directory) => {
    if (!directory) return "Components"
    const parts = directory.split(/[\\/]/).filter(Boolean)
    const componentsIndex = parts.lastIndexOf("components")
    if (componentsIndex === -1) {
      return parts.length ? parts.map((segment) => plop.getHelper("properCase")(segment)).join("/") : "Components"
    }
    const slice = parts.slice(componentsIndex + 1)
    if (!slice.length) return "Components"
    return ["Components", ...slice.map((segment) => plop.getHelper("properCase")(segment))].join("/")
  })

  plop.setGenerator("create-story", {
    description: "コンポーネントと同階層にストーリーファイルを生成します",
    prompts: [
      {
        type: "input",
        name: "componentPath",
        message: "コンポーネントファイルへのパス (.tsx)",
        default: "src/components/example.tsx",
        validate: (value) => (value.endsWith(".tsx") ? true : ".tsx ファイルを指定してください"),
      },
    ],
    actions(data) {
      const parsed = path.parse(data.componentPath)
      const kebabName = parsed.name
      const componentName = plop.getHelper("properCase")(kebabName)
      const storyPath = path.join(parsed.dir, `${kebabName}.stories.tsx`)
      const componentSourcePath = path.join(parsed.dir, parsed.base)
      const componentSource = fs.existsSync(componentSourcePath)
        ? fs.readFileSync(componentSourcePath, "utf8")
        : ""

      const storySegments = inferStorySegments(parsed.dir)
      const storyTitle = createStoryTitle(storySegments, kebabName)

      const { variantsMap, defaultMap } = extractCvaVariantData(componentSource)

      const controls = []
      const defaultArgs = []

      for (const [variantKey, options] of Object.entries(variantsMap)) {
        if (!options.length) continue
        controls.push({ name: variantKey, control: "select", options })
        const preferred = defaultMap[variantKey] ?? pickDefaultOption(options)
        if (preferred) {
          const parsedValue = coerceLiteral(preferred)
          defaultArgs.push({
            key: variantKey,
            value: parsedValue.value,
            isString: parsedValue.isString,
          })
        }
      }

      if (/button/i.test(componentName) && !defaultArgs.some((arg) => arg.key === "children")) {
        defaultArgs.push({ key: "children", value: "Button", isString: true })
      }

      return [
        {
          type: "add",
          path: storyPath,
          templateFile: "plop-templates/component.stories.tsx.hbs",
          data: {
            name: componentName,
            storyTitle,
            controls,
            defaultArgs,
          },
          force: true,
        },
      ]
    },
  })
}

function extractCvaVariantData(source) {
  const variantsMap = {}
  const defaultMap = {}
  if (!source) {
    return { variantsMap, defaultMap }
  }

  const sourceFile = ts.createSourceFile("component.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

  function visit(node) {
    if (ts.isCallExpression(node) && isCvaCall(node)) {
      const config = node.arguments[1]
      if (config && ts.isObjectLiteralExpression(config)) {
        const variantsProp = findObjectProperty(config, "variants")
        if (variantsProp && ts.isObjectLiteralExpression(variantsProp.initializer)) {
          for (const prop of variantsProp.initializer.properties) {
            if (!ts.isPropertyAssignment(prop) || !prop.name) continue
            const key = getPropertyNameText(prop.name)
            if (!key || !ts.isObjectLiteralExpression(prop.initializer)) continue
            const options = []
            for (const option of prop.initializer.properties) {
              if (!option.name) continue
              const optionKey = getPropertyNameText(option.name)
              if (optionKey) options.push(optionKey)
            }
            if (options.length) {
              variantsMap[key] = Array.from(new Set(options))
            }
          }
        }

        const defaultsProp = findObjectProperty(config, "defaultVariants")
        if (defaultsProp && ts.isObjectLiteralExpression(defaultsProp.initializer)) {
          for (const prop of defaultsProp.initializer.properties) {
            if (!ts.isPropertyAssignment(prop) || !prop.name || !prop.initializer) continue
            const key = getPropertyNameText(prop.name)
            if (!key) continue
            defaultMap[key] = extractLiteralValue(prop.initializer)
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return { variantsMap, defaultMap }
}

function isCvaCall(node) {
  if (ts.isIdentifier(node.expression)) {
    return node.expression.text === "cva"
  }
  if (ts.isPropertyAccessExpression(node.expression)) {
    return node.expression.name.text === "cva"
  }
  return false
}

function findObjectProperty(objectLiteral, propertyName) {
  for (const prop of objectLiteral.properties) {
    if (!prop.name) continue
    if (getPropertyNameText(prop.name) === propertyName) {
      return prop
    }
  }
  return undefined
}

function getPropertyNameText(name) {
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name)) {
    return name.text
  }
  if (ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) {
    return String(name.text)
  }
  return undefined
}

function extractLiteralValue(initializer) {
  if (ts.isStringLiteralLike(initializer) || ts.isNumericLiteral(initializer)) {
    return initializer.text
  }
  if (initializer.kind === ts.SyntaxKind.TrueKeyword) {
    return "true"
  }
  if (initializer.kind === ts.SyntaxKind.FalseKeyword) {
    return "false"
  }
  return initializer.getText()
}

function coerceLiteral(value) {
  if (value === "true" || value === "false") {
    return { value: value === "true", isString: false }
  }
  if (!Number.isNaN(Number(value)) && value.trim() !== "") {
    return { value: Number(value), isString: false }
  }
  return { value, isString: true }
}

function pickDefaultOption(options) {
  if (!options.length) return undefined
  const preferred = options.includes("default") ? "default" : options[0]
  return preferred
}

function inferStorySegments(directory) {
  if (!directory) return []
  const parts = directory.split(/[\\/]/).filter(Boolean)
  const componentsIndex = parts.lastIndexOf("components")
  if (componentsIndex === -1) {
    return parts.map(toKebabCase)
  }
  const slice = parts.slice(componentsIndex + 1)
  return ["components", ...slice.map(toKebabCase)]
}

function createStoryTitle(segments, componentKebabName) {
  const titleSegments = [...segments]
  if (componentKebabName) {
    if (!titleSegments.length || titleSegments[titleSegments.length - 1] !== componentKebabName) {
      titleSegments.push(componentKebabName)
    }
  }
  return titleSegments.join("/")
}

function toKebabCase(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
}
