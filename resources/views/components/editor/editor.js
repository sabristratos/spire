import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';

export function editorComponent(config = {}) {
    // Store editor outside Alpine's reactive scope to avoid Tiptap proxy errors
    let editor;

    return {
        content: config.content || '',
        format: config.format || 'html',
        characterCount: 0,
        wordCount: 0,
        updatedAt: Date.now(),

        init() {
            // Initialize the editor in the next tick to ensure the element exists
            this.$nextTick(() => {
                this.initEditor();
            });
        },

        initEditor() {
            const extensions = [
                StarterKit.configure({
                    heading: {
                        levels: [1, 2, 3],
                    },
                }),
                Link.configure({
                    openOnClick: false,
                    HTMLAttributes: {
                        class: 'text-primary hover:underline',
                    },
                }),
                Image.configure({
                    HTMLAttributes: {
                        class: 'max-w-full h-auto rounded-md',
                    },
                }),
                CharacterCount,
            ];

            // Add placeholder if provided
            if (config.placeholder) {
                extensions.push(
                    Placeholder.configure({
                        placeholder: config.placeholder,
                    })
                );
            }

            editor = new Editor({
                element: this.$refs.editorElement,
                extensions: extensions,
                content: this.getInitialContent(),
                editable: config.editable ?? true,
                onUpdate: ({ editor: editorInstance }) => {
                    this.updatedAt = Date.now();
                    this.updateContent(editorInstance);
                    this.updateCounts(editorInstance);
                },
                onCreate: ({ editor: editorInstance }) => {
                    this.updatedAt = Date.now();
                    this.updateCounts(editorInstance);
                },
                onSelectionUpdate: () => {
                    this.updatedAt = Date.now();
                },
            });

            // Watch for external content changes (from Livewire)
            this.$watch('content', (value) => {
                if (!editor) return;

                const currentContent = this.format === 'json'
                    ? JSON.stringify(editor.getJSON())
                    : editor.getHTML();

                // Avoid update loops
                if (value !== currentContent) {
                    this.setEditorContent(value);
                }
            });
        },

        getInitialContent() {
            if (!this.content) return '';

            if (this.format === 'json') {
                try {
                    return JSON.parse(this.content);
                } catch (e) {
                    return '';
                }
            }

            return this.content;
        },

        setEditorContent(value) {
            if (!editor) return;

            if (!value) {
                editor.commands.setContent('', false);
                return;
            }

            if (this.format === 'json') {
                try {
                    const json = typeof value === 'string' ? JSON.parse(value) : value;
                    editor.commands.setContent(json, false);
                } catch (e) {
                    console.error('Invalid JSON content:', e);
                }
            } else {
                editor.commands.setContent(value, false);
            }
        },

        updateContent(editorInstance) {
            this.content = this.format === 'json'
                ? JSON.stringify(editorInstance.getJSON())
                : editorInstance.getHTML();
        },

        updateCounts(editorInstance) {
            const stats = editorInstance.storage.characterCount;
            this.characterCount = stats.characters();
            this.wordCount = stats.words();
        },

        // Toolbar command methods
        toggleBold() {
            if (!editor) return;
            editor.chain().focus().toggleBold().run();
        },

        toggleItalic() {
            if (!editor) return;
            editor.chain().focus().toggleItalic().run();
        },

        toggleStrike() {
            if (!editor) return;
            editor.chain().focus().toggleStrike().run();
        },

        toggleCode() {
            if (!editor) return;
            editor.chain().focus().toggleCode().run();
        },

        toggleHeading(level) {
            if (!editor) return;
            editor.chain().focus().toggleHeading({ level }).run();
        },

        toggleBulletList() {
            if (!editor) return;
            editor.chain().focus().toggleBulletList().run();
        },

        toggleOrderedList() {
            if (!editor) return;
            editor.chain().focus().toggleOrderedList().run();
        },

        toggleBlockquote() {
            if (!editor) return;
            editor.chain().focus().toggleBlockquote().run();
        },

        toggleCodeBlock() {
            if (!editor) return;
            editor.chain().focus().toggleCodeBlock().run();
        },

        setLink() {
            if (!editor) return;

            const previousUrl = editor.getAttributes('link').href;
            const url = window.prompt('Enter URL:', previousUrl);

            // Cancelled
            if (url === null) {
                return;
            }

            // Empty
            if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run();
                return;
            }

            // Update link
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        },

        addImage() {
            if (!editor) return;

            const url = window.prompt('Enter image URL:');

            if (url) {
                editor.chain().focus().setImage({ src: url }).run();
            }
        },

        undo() {
            if (!editor) return;
            editor.chain().focus().undo().run();
        },

        redo() {
            if (!editor) return;
            editor.chain().focus().redo().run();
        },

        // State checks for active toolbar buttons
        isActive(name, attrs = {}) {
            if (!editor) return false;
            // Force reactivity by accessing updatedAt
            this.updatedAt;
            return editor.isActive(name, attrs);
        },

        canUndo() {
            if (!editor) return false;
            this.updatedAt;
            return editor.can().undo();
        },

        canRedo() {
            if (!editor) return false;
            this.updatedAt;
            return editor.can().redo();
        },

        destroy() {
            if (editor) {
                editor.destroy();
            }
        },
    };
}
