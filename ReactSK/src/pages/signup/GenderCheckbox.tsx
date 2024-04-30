import React from 'react'


interface GenderCheckBoxProps {
    onCheckboxChange: any,
    selectedGender: any

}

const GenderCheckbox = ({ onCheckboxChange, selectedGender }: GenderCheckBoxProps) => {
    return (
            <div className='flex text-white items-center justify-center h-full w-full'>
                <div className='form-control text-white'>
                    <label className={`label gap-2 cursor-pointer text-white ${selectedGender === "Male" ? "selected" : ""}`}>
                        <span className='label-text text-white'>Mand</span>
                        <input type="checkbox" className='checkbox border-white '

                            checked={selectedGender === "Male"}
                            onChange={() => onCheckboxChange("Male")}
                        />
                    </label>
                </div>

                <div className='form-control'>
                    <label className={`label gap-2 cursor-pointer text-white ${selectedGender === "Female" ? "selected" : ""}`}>
                        <span className='label-text text-white'>Kvinde</span>
                        <input type="checkbox" className='checkbox border-white'
                            checked={selectedGender === "Female"}
                            onChange={() => onCheckboxChange("Female")}
                        />
                    </label>
                </div>

            </div>
    );
};

export default GenderCheckbox
