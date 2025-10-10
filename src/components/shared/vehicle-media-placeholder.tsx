interface VehicleMediaPlaceholderProps {
  maker: string
  model: string
  className?: string
}

export function VehicleMediaPlaceholder({ maker, model, className }: VehicleMediaPlaceholderProps) {
  return (
    <div className={className}>
      <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
        <div className="text-center">
          <div className="text-sm font-medium">車両画像</div>
          <div className="mt-1 text-xs">
            {maker} {model}
          </div>
        </div>
      </div>
    </div>
  )
}

