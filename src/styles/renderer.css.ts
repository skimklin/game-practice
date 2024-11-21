import { style } from '@vanilla-extract/css'

export const rendererContainerClass = style({
  position: 'fixed',
  left: '100px',
  top: '100px',
  height: '600px',
  width: '800px',
  backgroundColor: '#f0f0f0',
})

export const characterClass = style({
  position: 'absolute',
  border: '1px solid #aaa',
})
