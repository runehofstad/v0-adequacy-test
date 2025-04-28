"use client"

import { useEffect, useRef } from "react"
import {
  Chart,
  type ChartConfiguration,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface HeatMapProps {
  data: { name: string; mentions: number }[]
}

export function HeatMap({ data }: HeatMapProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Sort data by mentions (descending)
    const sortedData = [...data].sort((a, b) => b.mentions - a.mentions)

    // Prepare data
    const labels = sortedData.map((item) => item.name)
    const values = sortedData.map((item) => item.mentions)

    // Create chart
    const config: ChartConfiguration = {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Mentions",
            data: values,
            backgroundColor: "rgba(59, 130, 246, 0.8)",
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Mentions",
            },
          },
          y: {
            title: {
              display: true,
              text: "Topics",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => `Mentions: ${context.parsed.x}`,
            },
          },
        },
      },
    }

    chartInstance.current = new Chart(ctx, config)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <div className="w-full" style={{ height: `${Math.max(300, data.length * 50)}px` }}>
      <canvas ref={chartRef} />
    </div>
  )
}
