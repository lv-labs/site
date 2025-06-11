type PanelProps = {
  label: string
}

export function Panel({ label }: PanelProps) {
  return (
    <div className="panel">

      <div className="noise-overlay">
        {/* Noise overlay */}
      </div>

      <div className="panel-frame">

        <div>
          {label}
        </div>

      </div>

    </div>
  )
}
