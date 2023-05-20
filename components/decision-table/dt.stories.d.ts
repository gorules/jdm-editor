import type { Meta, StoryObj } from '@storybook/react';
import { DecisionTable } from './dt';
export declare const inputSchemaDefault: {
    field: string;
    name: string;
    items: {
        field: string;
        name: string;
    }[];
}[];
declare const meta: Meta<typeof DecisionTable>;
export default meta;
type Story = StoryObj<typeof DecisionTable>;
export declare const Uncontrolled: Story;
export declare const Controlled: Story;
export declare const Empty: Story;
export declare const CustomRenderer: Story;
export declare const StressTest: Story;
//# sourceMappingURL=dt.stories.d.ts.map