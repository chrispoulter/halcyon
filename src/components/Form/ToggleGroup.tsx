import clsx from 'clsx';
import { useField } from 'formik';
import { Switch } from '@headlessui/react';

type ToggleGroupOption = {
    value: any;
    title: string;
    description: string;
};

type ToggleGroupProps = {
    name: string;
    options: ToggleGroupOption[];
    disabled?: boolean;
};

export const ToggleGroup = ({ name, options, disabled }: ToggleGroupProps) => {
    const [field] = useField<ToggleGroupOption[]>(name);

    const currentValues = field.value ?? [];

    const onChange = (value: any, checked: boolean) =>
        field.onChange({
            target: {
                name: field.name,
                value: checked
                    ? [value, ...currentValues]
                    : currentValues.filter(v => v !== value)
            }
        });

    return (
        <>
            {options.map(option => {
                const isChecked = currentValues.indexOf(option.value) > -1;

                return (
                    <Switch
                        key={`${name}.${option.value}`}
                        checked={isChecked}
                        onChange={checked => onChange(option.value, checked)}
                        onBlur={field.onBlur}
                        disabled={disabled}
                        className={clsx(
                            'mb-2 flex w-full items-center justify-between gap-5 border px-5 py-3 text-left focus:outline-none focus:ring-1 focus:ring-cyan-500 sm:py-2',
                            {
                                'cursor-not-allowed opacity-50': disabled
                            }
                        )}
                    >
                        <div className="text-sm font-medium text-gray-800">
                            {option.title}
                            <br />
                            <small className="text-sm font-light text-gray-500">
                                {option.description}
                            </small>
                        </div>
                        <div
                            className={clsx(
                                'inline-flex h-6 w-11 shrink-0 items-center rounded-full',
                                {
                                    'bg-cyan-600': isChecked,
                                    'bg-gray-200': !isChecked
                                }
                            )}
                        >
                            <span
                                className={clsx(
                                    'inline-block h-4 w-4 rounded-full bg-white transition-transform',
                                    {
                                        'translate-x-6': isChecked,
                                        'translate-x-1': !isChecked
                                    }
                                )}
                            />
                        </div>
                    </Switch>
                );
            })}
        </>
    );
};
