import { useState, useEffect } from 'react'
import { detectDeviceType } from '../canvas/Player'
import { useMultiInputControl } from '../hooks/useInputControl'
import { VscRunAll } from 'react-icons/vsc'
import { GiJumpAcross } from 'react-icons/gi'
import { EDeviceType } from '../utils/model'

export const DomUI = ({ fontColor = '#fff', backgroundColor = '#00FF00' }) => {
  const { attachRunBtn, attachJumpBtn } = useMultiInputControl()
  const [device, setDevice] = useState<EDeviceType>(EDeviceType.Unknown)
  const [isVertical, setIsVertical] = useState<boolean>(false)

  useEffect(() => {
    const _d = detectDeviceType()
    setDevice(_d)
    if (_d === EDeviceType.Mobile || _d === EDeviceType.Tablet) {
      attachRunBtn('runbtn')
      attachJumpBtn('jumpbtn')
      if (window.innerWidth > window.innerHeight) {
        setIsVertical(true)
      }
    }
  }, [device])

  return (
    <>
      {(device === EDeviceType.Mobile || device === EDeviceType.Tablet) && (
        <div
          style={{
            position: 'absolute',
            right: '16px',
            bottom: '32px',
            zIndex: 10
          }}>
          <div
            id="runbtn"
            style={{
              backgroundColor: backgroundColor,
              color: fontColor,
              fontSize: '32px',
              position: 'absolute',
              right: `${isVertical ? 0 : 16}px`,
              bottom: `${isVertical ? 112 : 0}px`,
              cursor: 'pointer',
              borderRadius: '32px',
              padding: '8px 15px',
              marginBottom: '125px'
            }}>
            <VscRunAll />
          </div>
          {/** ジャンプボタン */}
          <div
            id="jumpbtn"
            style={{
              backgroundColor: backgroundColor,
              color: fontColor,
              fontSize: '32px',
              position: 'absolute',
              right: `${isVertical ? 0 : 16}px`,
              bottom: `${isVertical ? 28 : 0}px`,
              cursor: 'pointer',
              borderRadius: '32px',
              padding: '8px 15px',
              marginBottom: '50px'
            }}>
            <GiJumpAcross />
          </div>
        </div>
      )}
    </>
  )
}
