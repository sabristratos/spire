@props([
    'accept' => [],
    'maxSize' => null,
    'maxFiles' => null,
    'multiple' => false,
    'existing' => [],
    'autoUpload' => true,
    'removeEvent' => 'removeExistingFile',
    'disabled' => false,
    'urlUpload' => false,
])

@php
use SpireUI\Support\ComponentClass;

$wireModel = $attributes->wire('model')->value() ?? null;
$isLive = $wireModel && $attributes->wire('model')->hasModifier('live');

// Normalize accept to array
$acceptArray = is_array($accept) ? $accept : (is_string($accept) && $accept ? explode(',', $accept) : []);
$acceptString = implode(',', $acceptArray);

// Format accept for JavaScript
$acceptJson = json_encode($acceptArray);

// Format existing files for JavaScript
$existingJson = json_encode($existing instanceof \Illuminate\Support\Collection ? $existing->toArray() : $existing);

// Format wireModelName for JavaScript
$wireModelJs = $wireModel ? "'" . $wireModel . "'" : 'null';

$containerBuilder = ComponentClass::make('file-upload')
    ->addIf($disabled, 'spire-file-upload--disabled')
    ->dataAttribute('file-upload', 'true')
    ->dataAttribute('multiple', $multiple ? 'true' : 'false')
    ->dataAttribute('disabled', $disabled ? 'true' : 'false');
@endphp

<div
    x-data="spireFileUpload({
        multiple: {{ $multiple ? 'true' : 'false' }},
        maxFiles: {{ $maxFiles ?? 'null' }},
        maxSize: {{ $maxSize ?? 'null' }},
        accept: {{ $acceptJson }},
        autoUpload: {{ $autoUpload ? 'true' : 'false' }},
        wireModelName: {{ $wireModelJs }},
        removeEvent: '{{ $removeEvent }}',
        existingFiles: {{ $existingJson }},
        translations: {
            dropzone: '{{ __('spire::spire-ui.file_upload.dropzone') }}',
            dropzoneActive: '{{ __('spire::spire-ui.file_upload.dropzone_active') }}',
            browse: '{{ __('spire::spire-ui.file_upload.browse') }}',
            uploading: '{{ __('spire::spire-ui.file_upload.uploading') }}',
            uploaded: '{{ __('spire::spire-ui.file_upload.uploaded') }}',
            error: '{{ __('spire::spire-ui.file_upload.error') }}',
            remove: '{{ __('spire::spire-ui.file_upload.remove') }}',
            retry: '{{ __('spire::spire-ui.file_upload.retry') }}',
            maxFilesError: '{{ __('spire::spire-ui.file_upload.max_files_error') }}',
            maxSizeError: '{{ __('spire::spire-ui.file_upload.max_size_error') }}',
            invalidTypeError: '{{ __('spire::spire-ui.file_upload.invalid_type_error') }}',
            urlPlaceholder: '{{ __('spire::spire-ui.file_upload.url_placeholder') }}',
            urlUpload: '{{ __('spire::spire-ui.file_upload.upload') }}',
            urlError: '{{ __('spire::spire-ui.file_upload.url_error') }}',
            urlInvalid: '{{ __('spire::spire-ui.file_upload.url_invalid') }}',
            urlCorsError: '{{ __('spire::spire-ui.file_upload.url_cors_error') }}',
        }
    })"
    {{ $attributes->whereDoesntStartWith('wire:model')->except(['class'])->merge(['class' => $containerBuilder->build(), ...$containerBuilder->getDataAttributes()]) }}
>
    {{-- Hidden file input --}}
    <input
        type="file"
        x-ref="fileInput"
        class="sr-only"
        @change="handleFileInputChange($event)"
        {{ $multiple ? 'multiple' : '' }}
        @if($acceptString) accept="{{ $acceptString }}" @endif
        {{ $disabled ? 'disabled' : '' }}
        aria-hidden="true"
        tabindex="-1"
    >

    {{-- Screen reader announcements --}}
    <div class="sr-only" aria-live="polite" x-ref="statusAnnouncer"></div>
    <div class="sr-only" aria-live="assertive" x-ref="errorAnnouncer"></div>

    {{-- Drop Zone --}}
    <x-spire::file-upload.zone :disabled="$disabled" />

    {{-- Validation Errors --}}
    <template x-if="validationErrors.length > 0">
        <div class="mt-2 space-y-1">
            <template x-for="error in validationErrors" :key="error">
                <x-spire::form.error>
                    <span x-text="error"></span>
                </x-spire::form.error>
            </template>
        </div>
    </template>

    {{-- URL Upload Section --}}
    @if($urlUpload && !$disabled)
        <x-spire::separator>{{ __('spire::spire-ui.file_upload.or') }}</x-spire::separator>

        <div class="spire-file-upload__url">
            <x-spire::form.label class="spire-file-upload__url-label">
                {{ __('spire::spire-ui.file_upload.upload_from_url') }}
            </x-spire::form.label>
            <div class="spire-file-upload__url-input">
                <x-spire::input
                    type="url"
                    x-model="urlInput"
                    @input="clearUrlError()"
                    @keydown.enter.prevent="uploadFromUrl()"
                    ::placeholder="translations.urlPlaceholder"
                    class="flex-1"
                />
                <x-spire::button
                    type="button"
                    color="primary"
                    size="md"
                    @click="uploadFromUrl()"
                    ::disabled="urlUploading || !urlInput.trim()"
                >
                    <template x-if="urlUploading">
                        <x-spire::spinner size="sm" />
                    </template>
                    <span x-show="!urlUploading">{{ __('spire::spire-ui.file_upload.upload') }}</span>
                </x-spire::button>
            </div>
            <template x-if="urlError">
                <x-spire::form.error class="mt-2">
                    <span x-text="urlError"></span>
                </x-spire::form.error>
            </template>
        </div>
    @endif

    {{-- File Lists --}}
    <div class="spire-file-upload__lists" x-show="hasFiles" x-cloak>
        {{-- Existing Files --}}
        <template x-if="existingFiles.length > 0">
            <div class="spire-file-upload__existing">
                <div class="spire-file-upload__section-label">
                    {{ __('spire::spire-ui.file_upload.existing_files') }}
                </div>
                <div class="spire-file-upload__list">
                    <template x-for="file in existingFiles" :key="file.id">
                        <x-spire::file-upload.existing />
                    </template>
                </div>
            </div>
        </template>

        {{-- New Files --}}
        <template x-if="files.length > 0">
            <div class="spire-file-upload__new">
                <div class="spire-file-upload__section-label">
                    {{ __('spire::spire-ui.file_upload.new_files') }}
                </div>
                <div class="spire-file-upload__list">
                    <template x-for="file in files" :key="file.id">
                        <x-spire::file-upload.preview />
                    </template>
                </div>
            </div>
        </template>
    </div>

    {{-- Upload Button (for manual upload mode) --}}
    @if(!$autoUpload)
        <div class="spire-file-upload__actions" x-show="pendingCount > 0" x-cloak>
            <x-spire::button
                type="button"
                color="primary"
                size="sm"
                @click="uploadAllPending()"
                ::disabled="isUploading"
            >
                <span x-show="!isUploading">{{ __('spire::spire-ui.file_upload.upload_all') }}</span>
                <span x-show="isUploading" x-cloak>
                    <x-spire::spinner size="sm" />
                    {{ __('spire::spire-ui.file_upload.uploading') }}
                </span>
            </x-spire::button>
        </div>
    @endif
</div>
