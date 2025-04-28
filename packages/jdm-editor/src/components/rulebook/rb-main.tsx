import { PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Typography } from 'antd';
import React, { useCallback, useState } from 'react';

import { useRulebookActions, useRulebookState } from './context/rb-store.context';
import { BlockComponent } from './rb-block';
import type { Block } from './rb-types';
import './rulebook.scss';

export type RulebookMainProps = {
  //
};

// Main Rulebook Component
export const RulebookMain: React.FC<RulebookMainProps> = () => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const { blocks, disabled, configurable } = useRulebookState(({ rulebook, disabled, configurable }) => ({
    blocks: rulebook?.blocks || [],
    disabled,
    configurable,
  }));

  const { moveBlock, addBlock, removeBlock } = useRulebookActions();

  // Handle block selection
  const handleBlockSelect = useCallback(
    (id: string) => {
      if (selectedBlockId === id) {
        return;
      }
      setSelectedBlockId(id);
    },
    [selectedBlockId],
  );

  // Generate a new unique ID
  const generateId = () => {
    return `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  // Create an empty block of the specified type
  const createEmptyBlock = (type: string): Block => {
    switch (type) {
      case 'markdown':
        return {
          id: generateId(),
          type: 'markdown',
          name: 'Markdown',
          content: {
            source: '# New Markdown Block\n\nStart typing here...',
          },
        };
      case 'decisionTable':
        return {
          id: generateId(),
          type: 'decisionTable',
          name: 'Decision Table',
          content: {
            inputs: [],
            outputs: [],
            rules: [],
          },
        };
      case 'function':
        return {
          id: generateId(),
          type: 'function',
          name: 'Function',
          content: {
            source: '// New function\nfunction example(input) {\n  return input;\n}',
          },
        };
      case 'expression':
        return {
          id: generateId(),
          type: 'expression',
          name: 'Expression',
          content: {
            expressions: [],
          },
        };
      default:
        return {
          id: generateId(),
          type: 'markdown',
          name: 'Markdown',
          content: {
            source: '# New Block',
          },
        };
    }
  };

  // Add a new block
  const handleAddBlock = useCallback(
    (afterId: string, type: string) => {
      if (disabled) return;

      const index = blocks.findIndex((block) => block.id === afterId);
      const newBlock = createEmptyBlock(type);

      addBlock(newBlock, index + 1);
      setSelectedBlockId(newBlock.id);
    },
    [disabled, blocks, addBlock],
  );

  // Add a block at the end
  const handleAddBlockAtEnd = (type: string) => {
    if (disabled) return;
    const newBlock = createEmptyBlock(type);
    addBlock(newBlock);
    setSelectedBlockId(newBlock.id);
  };

  // Block type options for the add block menu
  const blockTypes = [
    { key: 'markdown', label: 'Markdown' },
    { key: 'decisionTable', label: 'Decision Table' },
    { key: 'function', label: 'Function' },
    { key: 'expression', label: 'Expression' },
  ];

  return (
    <div className='grl-rb-container'>
      <div className='grl-rb-content'>
        {blocks.map((block, index) => {
          const isFirst = index === 0;
          const isLast = index === blocks.length - 1;
          const isSelected = selectedBlockId === block.id;

          return (
            <BlockComponent
              key={block.id}
              index={index}
              block={block}
              isSelected={isSelected}
              isFirst={isFirst}
              isLast={isLast}
              onSelect={() => handleBlockSelect(block.id)}
              onDelete={() => removeBlock(block.id)}
              onMoveUp={() => moveBlock(block.id, index - 1)}
              onMoveDown={() => moveBlock(block.id, index + 1)}
              onAddBlockAfter={(type) => handleAddBlock(block.id, type)}
            />
          );
        })}

        {blocks.length === 0 && (
          <div className='grl-rb-empty'>
            <Typography.Paragraph>
              No blocks added yet. {!disabled && 'Click the "Add Block" button to get started.'}
            </Typography.Paragraph>
            {!disabled && (
              <Dropdown
                menu={{
                  items: blockTypes.map((type) => ({
                    key: type.key,
                    label: type.label,
                    onClick: () => handleAddBlockAtEnd(type.key),
                  })),
                }}
                placement='bottomRight'
              >
                <Button size={'small'} type='primary' icon={<PlusOutlined />}>
                  Add Block
                </Button>
              </Dropdown>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
