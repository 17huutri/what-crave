import React from 'react';

const Button2 = ({ content, onClick, active, disabled }) => (
    <button
        className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(20,5,0,0.03)] text-sm font-normal transition-colors rounded-lg
    ${active ? "bg-blue-700 text-white" : "text-blue-700"}
    ${!disabled ? "bg-blue-100 hover:bg-blue-700 hover:text-white" : "text-blue-300 bg-white cursor-not-allowed"}`}
        onClick={onClick}
        disabled={disabled}
    >
        {content}
    </button>
);

export default Button2;
