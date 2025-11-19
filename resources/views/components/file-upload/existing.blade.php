{{-- Existing file item for server-stored files (list layout) --}}
<div class="spire-file-upload-item">
    {{-- Icon/Thumbnail --}}
    <template x-if="file.thumbnailUrl && isImage(file.type)">
        <div class="spire-file-upload-item-thumbnail">
            <img
                :src="file.thumbnailUrl"
                :alt="file.name"
            >
        </div>
    </template>

    <template x-if="!file.thumbnailUrl || !isImage(file.type)">
        <div
            class="spire-file-upload-item-icon"
            :class="{
                'spire-file-upload-item-icon--video': file.type && file.type.startsWith('video/'),
                'spire-file-upload-item-icon--audio': file.type && file.type.startsWith('audio/'),
                'spire-file-upload-item-icon--document': file.type === 'application/pdf'
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
            <template x-if="!file.type || (!file.type.startsWith('video/') && !file.type.startsWith('audio/') && file.type !== 'application/pdf')">
                <x-spire::icon name="image" class="w-5 h-5" />
            </template>
        </div>
    </template>

    {{-- File info --}}
    <div class="spire-file-upload-item-info">
        <p class="spire-file-upload-item-name" x-text="file.name" :title="file.name"></p>
        <div class="spire-file-upload-item-meta">
            <span class="spire-file-upload-item-size" x-text="formatFileSize(file.size)"></span>
        </div>
    </div>

    {{-- Action buttons --}}
    <div class="spire-file-upload-item-actions">
        {{-- View/Download button --}}
        <template x-if="file.url">
            <x-spire::button
                variant="outline"
                color="default"
                size="sm"
                icon-only
                ::href="file.url"
                target="_blank"
                ::aria-label="'{{ __('spire::spire-ui.file_upload.view') }} ' + file.name"
            >
                <x-spire::icon name="external-link" class="w-4 h-4" />
            </x-spire::button>
        </template>

        {{-- Remove button (always visible, bordered style) --}}
        <x-spire::button
            type="button"
            variant="outline"
            color="error"
            size="sm"
            icon-only
            @click="removeExistingFile(file)"
            ::aria-label="translations.remove + ' ' + file.name"
        >
            <x-spire::icon name="x" class="w-4 h-4" />
        </x-spire::button>
    </div>
</div>
