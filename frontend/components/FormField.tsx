const FormField = ({ labelName, placeholder, inputType, isTextArea, name }: { labelName: string; placeholder: string; inputType?: string; isTextArea?: boolean; name: string}) => {
    return (
        <label className="flex-1 w-full flex flex-col">
            {labelName && (
                <span className="font-epilogue font-medium text-[14px] leading-[22px] dark:text-white mb-[10px]">{labelName}</span>
            )}
            {isTextArea ? (
                <textarea
                    name={name}
                    required
                    rows={10}
                    placeholder={placeholder}
                    className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] dark:border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-gray-500 rounded-[10px] sm:min-w-[300px]"
                />
            ) : (
                <input
                    required
                    name={name}
                    type={inputType}
                    step="0.1"
                    placeholder={placeholder}
                    className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] dark:border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-gray-500 rounded-[10px] sm:min-w-[300px]"
                />
            )}
        </label>
    )
}

export default FormField