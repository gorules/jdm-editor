import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Expression } from '../expression';
import type { ExpressionEntry } from '../context/expression-store.context';

const defaultValue: ExpressionEntry[] = [{ id: 'row-1', key: 'approved', value: 'true' }];

describe('Expression', () => {
  it('shows Add row for full-edit permission and emits updated rows on command action', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(rows: ExpressionEntry[]) => void>();

    render(<Expression defaultValue={defaultValue} permission='edit:full' onChange={onChange} />);

    await user.click(await screen.findByRole('button', { name: /add row/i }));

    expect(onChange).toHaveBeenCalled();
    const nextRows = onChange.mock.calls.at(-1)?.[0];
    expect(nextRows).toBeDefined();
    if (!nextRows) {
      throw new Error('Expected onChange payload after adding expression row');
    }
    expect(nextRows).toHaveLength(2);
    expect(nextRows?.[0]?.key).toBe('approved');
    expect(nextRows[1]).toMatchObject({ key: '', value: '' });
    expect(nextRows[1]?.id).toEqual(expect.any(String));
  });

  it('hides Add row when permission is view-only', async () => {
    render(<Expression defaultValue={defaultValue} permission='view' onChange={vi.fn()} />);

    expect(await screen.findByText('Key')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /add row/i })).not.toBeInTheDocument();
  });
});
