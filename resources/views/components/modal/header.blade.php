@aware(['name' => null])

@props([
    'closable' => true,
])

@php
$classes = 'spire-modal__header';

$mergedAttributes = $attributes->merge([
    'class' => $classes,
]);
@endphp

<div {{ $mergedAttributes }}>
    <div class="flex-1">
        {{ $slot }}
    </div>

    @if($closable)
        <button
            type="button"
            class="spire-modal__close"
            @click="close()"
            aria-label="{{ __('spire-ui::spire-ui.modal.close') }}"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    @endif
</div>
