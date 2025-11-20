{{-- File preview item for newly selected files (list layout) --}}
<div
    class="spire-file-upload__item"
    :class="{ 'spire-file-upload__item--error': file.status === 'error' }"
>
    {{-- Icon/Thumbnail --}}
    <template x-if="file.previewUrl && isImage(file.type)">
        <div class="spire-file-upload__item-thumbnail">
            <img
                :src="file.previewUrl"
                :alt="file.name"
            >
        </div>
    </template>

    <template x-if="!file.previewUrl || !isImage(file.type)">
        <div
            class="spire-file-upload__item-icon"
            :class="{
                'spire-file-upload__item-icon--video': file.type && file.type.startsWith('video/'),
                'spire-file-upload__item-icon--audio': file.type && file.type.startsWith('audio/'),
                'spire-file-upload__item-icon--document': file.type === 'application/pdf',
                'spire-file-upload__item-icon--error': file.status === 'error'
            }"
        >
            <template x-if="file.type && file.type.startsWith('video/')">
                <x-spire::icon name="video" class="w-5 h-5" />
            </template>
            <template x-if="file.type && file.type.startsWith('audio/')">
                <x-spire::icon name="music" class="w-5 h-5" />
            </template>
            <template x-if="file.type === 'application/pdf'">
                <x-spire::icon name="file-text" class="w-5 h-5" />
            </template>
            <template x-if="file.status === 'error'">
                <x-spire::icon name="alert-circle" class="w-5 h-5" />
            </template>
            <template x-if="!file.type || (!file.type.startsWith('video/') && !file.type.startsWith('audio/') && file.type !== 'application/pdf' && file.status !== 'error')">
                <x-spire::icon name="image" class="w-5 h-5" />
            </template>
        </div>
    </template>

    {{-- File info --}}
    <div class="spire-file-upload__item-info">
        <p class="spire-file-upload__item-name" x-text="file.name" :title="file.name"></p>
        <div class="spire-file-upload__item-meta">
            <span class="spire-file-upload__item-size" x-text="formatFileSize(file.size)"></span>
            <template x-if="file.status === 'uploading'">
                <span class="spire-file-upload__item-status spire-file-upload__item-status--uploading">
                    {{ __('spire::spire-ui.file_upload.uploading') }}
                </span>
            </template>
            <template x-if="file.status === 'uploaded'">
                <span class="spire-file-upload__item-status spire-file-upload__item-status--uploaded">
                    {{ __('spire::spire-ui.file_upload.uploaded') }}
                </span>
            </template>
            <template x-if="file.status === 'error'">
                <span class="spire-file-upload__item-status spire-file-upload__item-status--error" x-text="file.error || translations.error"></span>
            </template>
        </div>

        {{-- Progress bar --}}
        <template x-if="file.status === 'uploading'">
            <div class="spire-file-upload__item-progress">
                <div
                    class="spire-file-upload__item-progress-bar"
                    :style="{ width: file.progress + '%' }"
                ></div>
            </div>
        </template>
        <template x-if="file.status === 'uploaded'">
            <div class="spire-file-upload__item-progress spire-file-upload__item-progress--complete">
                <div class="spire-file-upload__item-progress-bar" style="width: 100%"></div>
            </div>
        </template>
    </div>

    {{-- Action buttons --}}
    <div class="spire-file-upload__item-actions">
        {{-- Retry button (on error) --}}
        <template x-if="file.status === 'error'">
            <x-spire::button
                type="button"
                variant="outline"
                color="default"
                size="sm"
                icon-only
                @click="retryUpload(file)"
                ::aria-label="translations.retry + ' ' + file.name"
            >
                <x-spire::icon name="refresh-cw" class="w-4 h-4" />
            </x-spire::button>
        </template>

        {{-- Remove button (always visible, bordered style) --}}
        <x-spire::button
            type="button"
            variant="outline"
            color="error"
            size="sm"
            icon-only
            @click="removeFile(file)"
            ::aria-label="translations.remove + ' ' + file.name"
        >
            <x-spire::icon name="x" class="w-4 h-4" />
        </x-spire::button>
    </div>
</div>
