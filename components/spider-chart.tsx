"use client"

import { useEffect, useRef } from "react"
import {
  Chart,
  type ChartConfiguration,
  RadarController,
  RadialLinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"
import type { Question } from "@/lib/questions"

Chart.register(RadarController, RadialLinearScale, LineElement, PointElement, Tooltip, Legend)

interface SpiderChartProps {
  answers: Record<number, number>
  questions: Question[]
}

export function SpiderChart({ answers, questions }: SpiderChartProps) {
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

    // Prepare data
    const labels = questions.map((q) => q.shortLabel)
    const data = questions.map((_, index) => answers[index] || 0)

    // Create chart
    const config: ChartConfiguration = {
      type: "radar",
      data: {
        labels,
        datasets: [
          {
            label: "Your Score",
            data,
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(59, 130, 246, 1)",
            pointRadius: 4,
          },
          {
            label: "Ideal Score",
            data: Array(questions.length).fill(3),
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "rgba(100, 116, 139, 0.5)",
            borderWidth: 1,
            borderDash: [5, 5],
            pointBackgroundColor: "rgba(100, 116, 139, 0)",
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: 3,
            ticks: {
              stepSize: 1,
              display: false,
            },
            pointLabels: {
              font: {
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        elements: {
          line: {
            tension: 0.2,
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
  }, [answers, questions])

  return (
    <div className="w-full aspect-square max-w-xl mx-auto">
      <canvas ref={chartRef} />
    </div>
  )
}
