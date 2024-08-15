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
      context.font = '48px Impact'
      context.textAlign = 'center'

      // Top caption
      context.strokeText(topCaption, canvas.width / 2, 50)
      context.fillText(topCaption, canvas.width / 2, 50)

      // Bottom caption
      context.strokeText(bottomCaption, canvas.width / 2, canvas.height - 20)
      context.fillText(bottomCaption, canvas.width / 2, canvas.height - 20)
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
      <div>
        <Button onClick={() => setMode('static')} variant={mode === 'static' ? 'default' : 'outline'}>Static Mode</Button>
        <Button onClick={() => setMode('dynamic')} variant={mode === 'dynamic' ? 'default' : 'outline'}>Dynamic Mode</Button>
      </div>
      {mode === 'dynamic' && (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      )}
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
      <canvas id="memeCanvas" style={{
        border: '1px solid #333',
        borderRadius: 10,
        width: '100%',
        height: 'auto',
        margin: '20px 0'
      }} />
      <Button onClick={handleDownload}>Download Meme</Button>
    </div>
  )
}