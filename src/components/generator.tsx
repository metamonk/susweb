'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MemeGenerator() {
  const [mode, setMode] = useState<'static' | 'dynamic'>('static')
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [topCaption, setTopCaption] = useState('')
  const [bottomCaption, setBottomCaption] = useState('')

  useEffect(() => {
    const canvasElement = document.getElementById('memeCanvas') as HTMLCanvasElement
    setCanvas(canvasElement)
    setContext(canvasElement.getContext('2d'))
  }, [])

  useEffect(() => {
    if (!canvas || !context) return

    canvas.width = 800
    canvas.height = 800
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)

    const backgroundImage = new Image()
    backgroundImage.onload = () => {
      if (mode === 'static') {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
      } else {
        context.drawImage(backgroundImage, 0, canvas.height / 2, canvas.width, canvas.height / 2)
        if (image) {
          context.drawImage(image, 0, 0, canvas.width, canvas.height / 2)
        }
      }
      
      // Add captions
      context.fillStyle = 'white'
      context.strokeStyle = 'black'
      context.lineWidth = 5
      context.textAlign = 'center'

      // Function to draw wrapped text
      const drawWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const words = text.split(' ')
        let lines = ['']
        let fontSize = 48
        const minFontSize = 24
        context.font = `${fontSize}px Impact`

        // Wrap text first
        for (let word of words) {
          let currentLine = lines[lines.length - 1]
          let testLine = currentLine ? `${currentLine} ${word}` : word
          let metrics = context.measureText(testLine)
          
          if (metrics.width > maxWidth && currentLine !== '') {
            lines.push(word)
          } else {
            lines[lines.length - 1] = testLine
          }
        }

        // Reduce font size if still too wide
        while (lines.some(line => context.measureText(line).width > maxWidth) && fontSize > minFontSize) {
          fontSize--
          context.font = `${fontSize}px Impact`
        }

        let currentY = y
        for (let line of lines) {
          context.strokeText(line, x, currentY)
          context.fillText(line, x, currentY)
          currentY += lineHeight > 0 ? lineHeight * 0.9 : lineHeight * 0.8
        }
      }

      // Draw top caption
      drawWrappedText(topCaption, canvas.width / 2, 80, canvas.width - 20, 48 * 1.2)

      // Draw bottom caption
      const bottomTextY = canvas.height - 60
      drawWrappedText(bottomCaption, canvas.width / 2, bottomTextY, canvas.width - 20, -48 * 1.2)
    }
    backgroundImage.src = mode === 'static' ? '/images/thumbnail.png' : '/images/bottom.png'
  }, [mode, image, canvas, context, topCaption, bottomCaption])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setImage(img)
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleDownload = () => {
    if (!canvas) return

    const dataURL = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = dataURL
    a.download = `meme-${Date.now()}.png`
    a.click()
  }

  return (
    <div className='flex flex-col gap-4 max-w-[500px] mx-auto'>
      <div className='border-4 border-white p-4 flex flex-col items-center justify-center'>
        <h2 className='text-3xl font-bold font-jersey'>Meme Format</h2>
        <div className='flex flex-row align-center justify-center gap-2 mb-2'>
          <Button onClick={() => setMode('static')} variant={mode === 'static' ? 'default' : 'outline'}>Single</Button>
          <Button onClick={() => setMode('dynamic')} variant={mode === 'dynamic' ? 'default' : 'outline'}>Split</Button>
        </div>
        {mode === 'dynamic' && (
          <div className='flex flex-col gap-2 mb-2 w-full'>
            <label htmlFor="image" className='text-sm font-bold'>Upload Your Own Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        )}
        <div className='flex flex-col gap-2 w-full'>
          <Input
            placeholder="Top Caption"
            value={topCaption}
            onChange={(e) => setTopCaption(e.target.value)}
          />
          <Input
            placeholder="Bottom Caption"
            value={bottomCaption}
            onChange={(e) => setBottomCaption(e.target.value)}
          />
        </div>
      </div>
      <canvas id="memeCanvas" style={{
        border: '1px solid #333',
        width: '100%',
        height: 'auto',
        margin: '20px 0'
      }} />
      <Button onClick={handleDownload}>Download</Button>
    </div>
  )
}