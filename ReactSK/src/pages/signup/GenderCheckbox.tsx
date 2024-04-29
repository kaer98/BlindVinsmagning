import React from 'react'


interface GenderCheckBoxProps { 
    onCheckboxChange: any,
    selectedGender: any

}

const GenderCheckbox = ({onCheckboxChange, selectedGender}: GenderCheckBoxProps) => {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer ${selectedGender === "Male" ? "selected" : ""}`}>
                    <span className='label-text'>Mand</span>
                    <input type="checkbox" className='checkbox border-slate-900'

                        checked={selectedGender === "Male"}
                        onChange={() => onCheckboxChange("Male")}
                    />
                </label>
            </div>

            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer ${selectedGender === "Female" ? "selected" : ""}`}>
                    <span className='label-text'>Kvinde</span>
                    <input type="checkbox" className='checkbox border-slate-900'
                        checked={selectedGender === "Female"}
                        onChange={() => onCheckboxChange("Female")}
                    />
                </label>
            </div>

        </div>
    );
};

export default GenderCheckbox
