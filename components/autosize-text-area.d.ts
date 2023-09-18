import React from 'react';
export type AutosizeTextAreaProps = {
    maxRows: number;
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
export declare const AutosizeTextArea: React.ForwardRefExoticComponent<Omit<AutosizeTextAreaProps, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
//# sourceMappingURL=autosize-text-area.d.ts.map