import {DetailedHTMLProps, forwardRef, InputHTMLAttributes} from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

}

export const Input = forwardRef<HTMLInputElement, Props>(({...restProps}, ref) => {
    return (
        <input type="text" placeholder={'Поиск'} {...restProps} ref={ref}
               className='outline-none text-gray-900 border bg-transparent w-full p-4 rounded focus:border-purple-900'/>
    );
});
