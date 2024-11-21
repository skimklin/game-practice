import { style } from '@vanilla-extract/css'

export const rendererContainerClass = style({
  position: 'fixed',
  left: '80px',
  top: '80px',
  height: '800px',
  width: '1000px',
  backgroundColor: '#f0f0f0',
})

export const characterClass = style({
  position: 'absolute',
  border: '1px solid #aaa',
})
