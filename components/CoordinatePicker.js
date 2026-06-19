import React, { useState, useRef, useCallback, useEffect } from 'react'
import PatchEvent, { set } from '@sanity/form-builder/PatchEvent'

const PREVIEW_URL = process.env.SANITY_STUDIO_PROJECT_URL || ''

export default function CoordinatePicker({ value = {}, onChange }) {
  const [picking, setPicking] = useState(false)
  const overlayRef = useRef(null)

  const x = value.x != null ? value.x : ''
  const y = value.y != null ? value.y : ''

  const handleOverlayClick = useCallback(
    (e) => {
      const rect = overlayRef.current.getBoundingClientRect()
      const px = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
      const py = ((e.clientY - rect.top) / rect.height * 100).toFixed(1)
      onChange(PatchEvent.from(set(px, ['x']), set(py, ['y'])))
      setPicking(false)
    },
    [onChange]
  )

  const handleXChange = (e) =>
    onChange(PatchEvent.from(set(e.target.value, ['x'])))

  const handleYChange = (e) =>
    onChange(PatchEvent.from(set(e.target.value, ['y'])))

  // Close on Escape
  useEffect(() => {
    if (!picking) return
    const onKey = (e) => { if (e.key === 'Escape') setPicking(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [picking])

  const xPct = parseFloat(x)
  const yPct = parseFloat(y)
  const hasPosition = !isNaN(xPct) && !isNaN(yPct)

  return (
    <div style={{ fontFamily: 'sans-serif', fontSize: 14 }}>
      {/* Compact inputs row */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555' }}>
            X (%)
          </span>
          <input
            type="number"
            value={x}
            onChange={handleXChange}
            min="0"
            max="100"
            step="0.1"
            style={{ width: 80, padding: '5px 8px', border: '1px solid #ccc', borderRadius: 3, fontSize: 14 }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555' }}>
            Y (%)
          </span>
          <input
            type="number"
            value={y}
            onChange={handleYChange}
            min="0"
            max="100"
            step="0.1"
            style={{ width: 80, padding: '5px 8px', border: '1px solid #ccc', borderRadius: 3, fontSize: 14 }}
          />
        </label>
        <button
          type="button"
          onClick={() => setPicking(true)}
          style={{
            padding: '6px 14px',
            background: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: 3,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          Pick on Page
        </button>
      </div>

      {/* Full-screen modal picker */}
      {picking && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top bar */}
          <div
            style={{
              background: '#1a1a1a',
              color: '#fff',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 13,
              flexShrink: 0,
              zIndex: 1,
            }}
          >
            <span>Click anywhere on the page to set the title position</span>
            <button
              type="button"
              onClick={() => setPicking(false)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                border: 'none',
                borderRadius: 3,
                padding: '4px 12px',
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              Cancel (Esc)
            </button>
          </div>

          {/* iframe + overlay */}
          <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
            {PREVIEW_URL ? (
              <iframe
                src={PREVIEW_URL}
                title="Position picker"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  pointerEvents: 'none',
                }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#eee', color: '#999', fontSize: 13 }}>
                Set SANITY_STUDIO_PROJECT_URL in your .env to preview the site here.
              </div>
            )}

            {/* Transparent overlay captures clicks without blocking iframe render */}
            <div
              ref={overlayRef}
              onClick={handleOverlayClick}
              style={{
                position: 'absolute',
                inset: 0,
                cursor: 'crosshair',
                background: 'rgba(0,0,0,0.07)',
              }}
            >
              {/* Dot marking current position */}
              {hasPosition && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${xPct}%`,
                    top: `${yPct}%`,
                    transform: 'translate(-50%, -50%)',
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: 'red',
                    border: '2px solid white',
                    boxShadow: '0 0 0 1px red',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
