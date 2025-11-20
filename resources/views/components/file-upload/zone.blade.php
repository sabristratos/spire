@props([
    'disabled' => false,
])

@php
use SpireUI\Support\ComponentClass;

$zoneBuilder = ComponentClass::make('file-upload__zone')
    ->addIf($disabled, 'spire-file-upload__zone--disabled');

$zoneClasses = $zoneBuilder->build();
@endphp

<div
    x-ref="dropzone"
    class="{{ $zoneClasses }}"
    x-bind:class="{ 'spire-file-upload__zone--dragging': isDragging }"
    @if(!$disabled)
        @click="openFilePicker()"
        @keydown.enter.prevent="openFilePicker()"
        @keydown.space.prevent="openFilePicker()"
    @endif
    role="button"
    tabindex="{{ $disabled ? '-1' : '0' }}"
    aria-label="{{ __('spire::spire-ui.file_upload.dropzone') }}"
    aria-disabled="{{ $disabled ? 'true' : 'false' }}"
>
    {{-- Primary row: Icon + Text --}}
    <div class="spire-file-upload__zone-row" x-show="!isDragging">
        <div class="spire-file-upload__zone-icon">
            <x-spire::icon name="upload-cloud" class="w-full h-full" />
        </div>
        <span class="spire-file-upload__zone-primary">
            {{ __('spire::spire-ui.file_upload.choose_or_drag') }}
        </span>
    </div>

    {{-- Dragging state --}}
    <div class="spire-file-upload__zone-row" x-show="isDragging" x-cloak>
        <div class="spire-file-upload__zone-icon">
            <x-spire::icon name="upload-cloud" class="w-full h-full" />
        </div>
        <span class="spire-file-upload__zone-primary">
            {{ __('spire::spire-ui.file_upload.dropzone_active') }}
        </span>
    </div>

    {{-- Secondary text: Format hints + Size limit --}}
    <p class="spire-file-upload__zone-secondary" x-show="!isDragging">
        {{ __('spire::spire-ui.file_upload.formats_hint') }}
        <template x-if="maxSize">
            <span class="spire-file-upload__zone-hint" x-text="'{{ __('spire::spire-ui.file_upload.up_to') }} ' + formatFileSize(maxSize)"></span>
        </template>
    </p>
</div>
