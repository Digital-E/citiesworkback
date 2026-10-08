import React, {useState, useEffect, useCallback, forwardRef} from 'react'
import ReactDOM from 'react-dom'
import {FormBuilderInput} from 'part:@sanity/form-builder'
import PatchEvent, {set} from '@sanity/form-builder/PatchEvent'

const PREVIEW_URL = process.env.SANITY_STUDIO_PROJECT_URL || ''
const pickerSrc = PREVIEW_URL
  ? `${PREVIEW_URL}${PREVIEW_URL.includes('?') ? '&' : '?'}picker=true`
  : ''

const ProjectIslandInput = forwardRef(function ProjectIslandInput(props, ref) {
  const {value = {}, type, onChange, level, focusPath = [], onFocus, onBlur, markers = [], presence = []} = props
  const [isOpen, setIsOpen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const closePicker = useCallback(() => {
    setIsOpen(false)
    setIframeLoaded(false)
  }, [])

  // Receive coordinates from the frontend via postMessage
  useEffect(() => {
    if (!isOpen) return
    const handleMessage = (e) => {
      if (e.data && e.data.type === 'pickerResult') {
        onChange(PatchEvent.from(
          set(String(e.data.x), ['pickerPosition', 'x']),
          set(String(e.data.y), ['pickerPosition', 'y'])
        ))
        closePicker()
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [isOpen, onChange, closePicker])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {if (e.key === 'Escape') closePicker()}
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closePicker])

  return (
    <div ref={ref}>
      {type.fields.filter((field) => !['titlePositionX', 'titlePositionY', 'pickerPosition'].includes(field.name)).map((field) => (
        <FormBuilderInput
          key={field.name}
          field={field}
          type={field.type}
          value={value[field.name]}
          onChange={(patchEvent) => onChange(patchEvent.prefixAll(field.name))}
          level={level + 1}
          focusPath={focusPath[0] === field.name ? focusPath.slice(1) : []}
          onFocus={(path) => onFocus([field.name, ...path])}
          onBlur={onBlur}
          markers={markers.filter(m => m.path[0] === field.name).map(m => ({...m, path: m.path.slice(1)}))}
          presence={presence.filter(p => p.path[0] === field.name).map(p => ({...p, path: p.path.slice(1)}))}
        />
      ))}

      <div style={{marginTop: 12, marginBottom: 4}}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{padding: '6px 14px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 13, fontWeight: 500}}
        >
          Pick Title Position on Page
        </button>
      </div>

      {isOpen && ReactDOM.createPortal(
        <div style={{position: 'fixed', inset: 0, zIndex: 999999, display: 'flex', flexDirection: 'column'}}>
          <div style={{background: '#1a1a1a', color: '#fff', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, flexShrink: 0}}>
            <span>1. Click an island to select it &nbsp;&nbsp;&nbsp; 2. Click where the title should appear</span>
            <button
              type="button"
              onClick={closePicker}
              style={{background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 3, padding: '4px 12px', cursor: 'pointer', fontSize: 13}}
            >
              Cancel (Esc)
            </button>
          </div>
          <div style={{flex: 1, overflow: 'hidden', position: 'relative'}}>
            {!iframeLoaded && (
              <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#111', zIndex: 1, gap: 14}}>
                <div style={{
                  width: 32, height: 32,
                  border: '3px solid rgba(255,255,255,0.15)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <span style={{color: 'rgba(255,255,255,0.5)', fontSize: 12}}>Loading preview…</span>
              </div>
            )}
            {pickerSrc ? (
              <iframe
                src={pickerSrc}
                title="Position picker"
                onLoad={() => setIframeLoaded(true)}
                style={{position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none'}}
              />
            ) : (
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#eee', color: '#999', fontSize: 13}}>
                Set SANITY_STUDIO_PROJECT_URL in your .env to preview the site here.
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
})

export default ProjectIslandInput
