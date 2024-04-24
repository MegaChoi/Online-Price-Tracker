'use client'
import React from 'react'
import validate from './searchPromptValidationRules'
import useForm from './useForm'
export default function SearchBar() {

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(saveProduct, validate)

   function saveProduct(){

   }
  return (
    <div>
        <form 
            onSubmit={handleSubmit}
        >   
            <div>
                <input 
                onChange={handleChange}
                name='url'
                type="text" 
                placeholder='enter product link'
                value={values.url}
                />
                <button
                    type='submit'
                >
                    button
                </button>
            </div>
            {errors.error && <p>{errors.error}</p>}
        </form>

    </div>
  )
}
