@props([
    'variant' => 'bordered',
    'size' => 'md',
    'radius' => 'md',
    'format' => 'html',
    'placeholder' => null,
    'toolbar' => true,
    'buttons' => ['bold', 'italic', 'strike', 'code', 'heading', 'bulletList', 'orderedList', 'blockquote', 'link', 'image', 'undo', 'redo'],
    'showCharCount' => false,
    'disabled' => false,
    'editable' => true,
])

@php
use SpireUI\Support\WireEntangle;
use SpireUI\Support\ComponentClass;

$wireConfig = WireEntangle::fromAttributes($attributes);

$containerBuilder = ComponentClass::make('editor')
    ->modifier($variant)
    ->size($size)
    ->when($disabled, fn($b) => $b->modifier('disabled'));

// Apply radius to the outer wrapper for bordered variant
if ($variant === 'bordered') {
    $containerBuilder->radius($radius);
}

if ($customClass = $attributes->get('class')) {
    $containerBuilder->addClass($customClass);
}

$mergedAttributes = WireEntangle::filteredAttributes($attributes)->merge([
    'class' => $containerBuilder->build(),
]);
@endphp

<div {{ $mergedAttributes }} wire:ignore>
    <div
        x-modelable="content"
        x-data="spireEditor({
            @if($wireConfig->hasWireModel())
                content: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
            @elseif(!$attributes->has('x-model'))
                content: '',
            @endif
            format: '{{ $format }}',
            placeholder: '{{ $placeholder }}',
            editable: {{ ($disabled || !$editable) ? 'false' : 'true' }},
        })"
        @if($disabled || !$editable)
            x-bind:class="{ 'opacity-50 cursor-not-allowed': true }"
        @endif
    >
        @if($toolbar)
            <div class="spire-editor-toolbar spire-editor-toolbar--{{ $size }}">
                {{-- Text formatting --}}
                @if(in_array('bold', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="toggleBold()"
                        x-bind:class="{ 'bg-primary/10 text-primary': isActive('bold') }"
                        tooltip="{{ __('spire::spire-ui.editor.bold') }}"
                        aria-label="{{ __('spire::spire-ui.editor.bold') }}"
                    >
                        <x-spire::icon name="bold" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('italic', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="toggleItalic()"
                        x-bind:class="{ 'bg-primary/10 text-primary': isActive('italic') }"
                        tooltip="{{ __('spire::spire-ui.editor.italic') }}"
                        aria-label="{{ __('spire::spire-ui.editor.italic') }}"
                    >
                        <x-spire::icon name="italic" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('strike', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="toggleStrike()"
                        x-bind:class="{ 'bg-primary/10 text-primary': isActive('strike') }"
                        tooltip="{{ __('spire::spire-ui.editor.strike') }}"
                        aria-label="{{ __('spire::spire-ui.editor.strike') }}"
                    >
                        <x-spire::icon name="strikethrough" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('code', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="toggleCode()"
                        x-bind:class="{ 'bg-primary/10 text-primary': isActive('code') }"
                        tooltip="{{ __('spire::spire-ui.editor.code') }}"
                        aria-label="{{ __('spire::spire-ui.editor.code') }}"
                    >
                        <x-spire::icon name="code-2" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                {{-- Separator --}}
                @if(in_array('bold', $buttons) || in_array('italic', $buttons) || in_array('strike', $buttons) || in_array('code', $buttons))
                    <span class="w-px h-6 bg-surface-subtle mx-1"></span>
                @endif

                {{-- Headings --}}
                @if(in_array('heading', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="toggleHeading(1)"
                        x-bind:class="{ 'bg-primary/10 text-primary': isActive('heading', { level: 1 }) }"
                        tooltip="{{ __('spire::spire-ui.editor.heading') }} 1"
                        aria-label="{{ __('spire::spire-ui.editor.heading') }} 1"
                    >
                        <x-spire::icon name="heading" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('heading', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="toggleHeading(2)"
                        x-bind:class="{ 'bg-primary/10 text-primary': isActive('heading', { level: 2 }) }"
                        tooltip="{{ __('spire::spire-ui.editor.heading') }} 2"
                        aria-label="{{ __('spire::spire-ui.editor.heading') }} 2"
                    >
                        <x-spire::icon name="heading-2" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('heading', $buttons))
                    <span class="w-px h-6 bg-surface-subtle mx-1"></span>
                @endif

                {{-- Lists --}}
                @if(in_array('bulletList', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="toggleBulletList()"
                        x-bind:class="{ 'bg-primary/10 text-primary': isActive('bulletList') }"
                        tooltip="{{ __('spire::spire-ui.editor.bullet_list') }}"
                        aria-label="{{ __('spire::spire-ui.editor.bullet_list') }}"
                    >
                        <x-spire::icon name="list" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('orderedList', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="toggleOrderedList()"
                        x-bind:class="{ 'bg-primary/10 text-primary': isActive('orderedList') }"
                        tooltip="{{ __('spire::spire-ui.editor.ordered_list') }}"
                        aria-label="{{ __('spire::spire-ui.editor.ordered_list') }}"
                    >
                        <x-spire::icon name="list-ordered" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('bulletList', $buttons) || in_array('orderedList', $buttons))
                    <span class="w-px h-6 bg-surface-subtle mx-1"></span>
                @endif

                {{-- Blocks --}}
                @if(in_array('blockquote', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="toggleBlockquote()"
                        x-bind:class="{ 'bg-primary/10 text-primary': isActive('blockquote') }"
                        tooltip="{{ __('spire::spire-ui.editor.blockquote') }}"
                        aria-label="{{ __('spire::spire-ui.editor.blockquote') }}"
                    >
                        <x-spire::icon name="help-circle" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('codeBlock', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="toggleCodeBlock()"
                        x-bind:class="{ 'bg-primary/10 text-primary': isActive('codeBlock') }"
                        tooltip="{{ __('spire::spire-ui.editor.code_block') }}"
                        aria-label="{{ __('spire::spire-ui.editor.code_block') }}"
                    >
                        <x-spire::icon name="code-square" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('blockquote', $buttons) || in_array('codeBlock', $buttons))
                    <span class="w-px h-6 bg-surface-subtle mx-1"></span>
                @endif

                {{-- Media & Links --}}
                @if(in_array('link', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="setLink()"
                        x-bind:class="{ 'bg-primary/10 text-primary': isActive('link') }"
                        tooltip="{{ __('spire::spire-ui.editor.link') }}"
                        aria-label="{{ __('spire::spire-ui.editor.link') }}"
                    >
                        <x-spire::icon name="link" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('image', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="addImage()"
                        tooltip="{{ __('spire::spire-ui.editor.image') }}"
                        aria-label="{{ __('spire::spire-ui.editor.image') }}"
                    >
                        <x-spire::icon name="image" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('link', $buttons) || in_array('image', $buttons))
                    <span class="w-px h-6 bg-surface-subtle mx-1"></span>
                @endif

                {{-- History --}}
                @if(in_array('undo', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="undo()"
                        x-bind:disabled="!canUndo()"
                        tooltip="{{ __('spire::spire-ui.editor.undo') }}"
                        aria-label="{{ __('spire::spire-ui.editor.undo') }}"
                    >
                        <x-spire::icon name="undo-2" class="w-4 h-4" />
                    </x-spire::button>
                @endif

                @if(in_array('redo', $buttons))
                    <x-spire::button
                        variant="ghost"
                        size="sm"
                        :icon-only="true"
                        @click="redo()"
                        x-bind:disabled="!canRedo()"
                        tooltip="{{ __('spire::spire-ui.editor.redo') }}"
                        aria-label="{{ __('spire::spire-ui.editor.redo') }}"
                    >
                        <x-spire::icon name="redo-2" class="w-4 h-4" />
                    </x-spire::button>
                @endif
            </div>
        @endif

        <div
            x-ref="editorElement"
            class="spire-editor-content spire-editor-content--{{ $variant }} spire-editor-content--{{ $size }}"
        ></div>

        @if($showCharCount)
            <div class="spire-editor-character-count">
                <span x-text="characterCount"></span> {{ __('spire::spire-ui.editor.characters') }}
                <span class="mx-2">•</span>
                <span x-text="wordCount"></span> {{ __('spire::spire-ui.editor.words') }}
            </div>
        @endif
    </div>
</div>
