import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

interface PageTransitionProps {
    children: ReactNode
}

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
}

const pageTransition = {
    type: 'tween',
    duration: 0.3,
    ease: 'easeInOut'
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition
