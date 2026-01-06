import React from 'react'

interface AnimatedCardProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  return (
    <div
      className={`animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

export default AnimatedCard
