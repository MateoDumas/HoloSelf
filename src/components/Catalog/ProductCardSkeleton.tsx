import React from 'react'
import Skeleton from '../UI/Skeleton'

const ProductCardSkeleton: React.FC = () => {
    return (
        <div className="card p-4">
            <Skeleton className="w-full h-48 mb-4" />
            <Skeleton variant="text" className="w-3/4 mb-2" />
            <Skeleton variant="text" className="w-1/2 mb-4" />
            <div className="flex justify-between items-center">
                <Skeleton variant="text" className="w-1/3 h-6" />
                <Skeleton className="w-24 h-10 rounded-lg" />
            </div>
        </div>
    )
}

export default ProductCardSkeleton
