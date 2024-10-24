import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

// تعريف واجهة الخصائص
interface PrevArrowProps {
    onClick: () => void; // دالة للإشارة عند النقر
}

const PrevArrow: React.FC<PrevArrowProps> = ({ onClick }) => {
    return (
        <div className="absolute -right-4 top-[44%] shadow-lg text-mainColor bg-white w-10 h-10 hidden lg:flex justify-center items-center rounded-full z-10 cursor-pointer" onClick={onClick}>
            <FontAwesomeIcon icon={faAngleRight} />
        </div>
    );
};

export default PrevArrow;
