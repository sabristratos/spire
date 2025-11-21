import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

function getExtensionFromMimeType(mimeType) {
    const mimeToExt = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/webp': '.webp',
        'image/svg+xml': '.svg',
        'image/bmp': '.bmp',
        'image/tiff': '.tiff',
        'image/x-icon': '.ico',
        'application/pdf': '.pdf',
        'text/plain': '.txt',
        'text/html': '.html',
        'text/css': '.css',
        'text/javascript': '.js',
        'application/json': '.json',
        'application/xml': '.xml',
        'application/zip': '.zip',
        'application/x-rar-compressed': '.rar',
        'application/x-7z-compressed': '.7z',
        'application/msword': '.doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
        'application/vnd.ms-excel': '.xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
        'application/vnd.ms-powerpoint': '.ppt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
        'audio/mpeg': '.mp3',
        'audio/wav': '.wav',
        'audio/ogg': '.ogg',
        'video/mp4': '.mp4',
        'video/webm': '.webm',
        'video/ogg': '.ogv',
    };
    return mimeToExt[mimeType] || '';
}

export function fileUploadComponent(config = {}) {
    return {
        multiple: config.multiple || false,
        maxFiles: config.maxFiles || null,
        maxSize: config.maxSize || null,
        accept: config.accept || [],
        autoUpload: config.autoUpload !== false,
        wireModelName: config.wireModelName || null,
        removeEvent: config.removeEvent || 'removeExistingFile',

        files: [],
        existingFiles: config.existingFiles || [],
        isDragging: false,
        dragCounter: 0,
        dragListeners: null,

        urlInput: '',
        urlUploading: false,
        urlError: null,

        validationErrors: [],
        validationErrorTimer: null,

        translations: config.translations || {},

        init() {
            this.existingFiles = this.normalizeExistingFiles(config.existingFiles || []);

            this.$nextTick(() => {
                this.setupDragListeners();
            });
        },

        normalizeExistingFiles(files) {
            if (!files || !Array.isArray(files)) return [];

            return files.map(file => {
                if (file.original_url || file.url) {
                    return {
                        id: file.id || file.uuid || this.generateId(),
                        name: file.name || file.file_name || 'Unknown',
                        url: file.original_url || file.url,
                        thumbnailUrl: file.preview_url || file.thumb_url || file.original_url || file.url,
                        size: file.size || 0,
                        type: file.mime_type || file.type || 'application/octet-stream',
                        isExisting: true,
                    };
                }
                return {
                    id: file.id || this.generateId(),
                    name: file.name || 'Unknown',
                    url: file.url || '',
                    thumbnailUrl: file.thumbnailUrl || file.url || '',
                    size: file.size || 0,
                    type: file.type || 'application/octet-stream',
                    isExisting: true,
                };
            });
        },

        setupDragListeners() {
            const zone = this.$refs.dropzone;
            if (!zone) return;

            this.dragListeners = {
                dragenter: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.dragCounter++;
                    this.isDragging = true;
                },
                dragleave: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.dragCounter--;
                    if (this.dragCounter === 0) {
                        this.isDragging = false;
                    }
                },
                dragover: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                },
                drop: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.isDragging = false;
                    this.dragCounter = 0;
                    this.handleFiles(e.dataTransfer.files);
                }
            };

            Object.entries(this.dragListeners).forEach(([event, handler]) => {
                zone.addEventListener(event, handler);
            });
        },

        openFilePicker() {
            this.$refs.fileInput?.click();
        },

        handleFileInputChange(event) {
            this.handleFiles(event.target.files);
            event.target.value = '';
        },

        handleFiles(fileList) {
            const newFiles = Array.from(fileList);

            this.clearValidationErrors();

            if (this.maxFiles) {
                const totalFiles = this.files.length + this.existingFiles.length + newFiles.length;
                if (totalFiles > this.maxFiles) {
                    this.addValidationError(this.translations.maxFilesError.replace(':max', this.maxFiles));
                    return;
                }
            }

            const processedFiles = [];
            for (const file of newFiles) {
                const validation = this.validateFile(file);
                if (validation.valid) {
                    const fileObj = this.createFileObject(file);
                    processedFiles.push(fileObj);
                } else {
                    this.addValidationError(validation.error);
                }
            }

            this.files = [...this.files, ...processedFiles];

            if (this.autoUpload && processedFiles.length > 0) {
                processedFiles.forEach(fileObj => this.uploadFile(fileObj));
            }

            this.$dispatch(SPIRE_EVENTS.FILE_UPLOAD_ADDED, createEventPayload({
                value: processedFiles,
                metadata: { totalFiles: this.files.length }
            }));
        },

        validateFile(file) {
            if (this.maxSize && file.size > this.maxSize) {
                return {
                    valid: false,
                    error: this.translations.maxSizeError.replace(':max', this.formatFileSize(this.maxSize))
                };
            }

            if (this.accept.length > 0) {
                const isValid = this.accept.some(type => {
                    if (type.endsWith('/*')) {
                        return file.type.startsWith(type.replace('/*', '/'));
                    }
                    if (type.startsWith('.')) {
                        return file.name.toLowerCase().endsWith(type.toLowerCase());
                    }
                    return file.type === type;
                });

                if (!isValid) {
                    return {
                        valid: false,
                        error: this.translations.invalidTypeError
                    };
                }
            }

            return { valid: true };
        },

        createFileObject(file) {
            const id = this.generateId();
            let previewUrl = null;

            if (file.type.startsWith('image/')) {
                previewUrl = URL.createObjectURL(file);
            }

            return {
                id,
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                progress: 0,
                status: 'pending',
                previewUrl,
                error: null,
            };
        },

        uploadFile(fileObj) {
            if (!this.wireModelName || !this.$wire) {
                fileObj.status = 'uploaded';
                fileObj.progress = 100;
                return;
            }

            fileObj.status = 'uploading';

            const propertyName = this.multiple ? this.wireModelName : this.wireModelName;

            if (this.multiple) {
                this.$wire.uploadMultiple(
                    propertyName,
                    [fileObj.file],
                    (uploadedFilenames) => {
                        fileObj.status = 'uploaded';
                        fileObj.progress = 100;
                        this.announceStatus(`${fileObj.name} uploaded successfully`);
                        this.$dispatch(SPIRE_EVENTS.FILE_UPLOAD_COMPLETE, createEventPayload({
                            value: fileObj,
                            metadata: { uploadedFilenames }
                        }));
                    },
                    () => {
                        fileObj.status = 'error';
                        fileObj.error = this.translations.error;
                        this.announceError(`Failed to upload ${fileObj.name}`);
                        this.$dispatch(SPIRE_EVENTS.FILE_UPLOAD_ERROR, createEventPayload({
                            value: fileObj,
                            metadata: { error: this.translations.error }
                        }));
                    },
                    (event) => {
                        fileObj.progress = event.progress;
                        this.$dispatch(SPIRE_EVENTS.FILE_UPLOAD_PROGRESS, createEventPayload({
                            value: fileObj,
                            metadata: { progress: event.progress }
                        }));
                    },
                    () => {
                        fileObj.status = 'pending';
                        fileObj.progress = 0;
                    }
                );
            } else {
                this.$wire.upload(
                    propertyName,
                    fileObj.file,
                    (uploadedFilename) => {
                        fileObj.status = 'uploaded';
                        fileObj.progress = 100;
                        this.announceStatus(`${fileObj.name} uploaded successfully`);
                        this.$dispatch(SPIRE_EVENTS.FILE_UPLOAD_COMPLETE, createEventPayload({
                            value: fileObj,
                            metadata: { uploadedFilename }
                        }));
                    },
                    () => {
                        fileObj.status = 'error';
                        fileObj.error = this.translations.error;
                        this.announceError(`Failed to upload ${fileObj.name}`);
                        this.$dispatch(SPIRE_EVENTS.FILE_UPLOAD_ERROR, createEventPayload({
                            value: fileObj,
                            metadata: { error: this.translations.error }
                        }));
                    },
                    (event) => {
                        fileObj.progress = event.progress;
                        this.$dispatch(SPIRE_EVENTS.FILE_UPLOAD_PROGRESS, createEventPayload({
                            value: fileObj,
                            metadata: { progress: event.progress }
                        }));
                    },
                    () => {
                        fileObj.status = 'pending';
                        fileObj.progress = 0;
                    }
                );
            }
        },

        retryUpload(fileObj) {
            fileObj.error = null;
            fileObj.progress = 0;
            this.uploadFile(fileObj);
        },

        removeFile(fileObj) {
            if (fileObj.previewUrl) {
                URL.revokeObjectURL(fileObj.previewUrl);
            }

            this.files = this.files.filter(f => f.id !== fileObj.id);

            if (fileObj.status === 'uploading' && this.$wire && this.wireModelName) {
                this.$wire.cancelUpload(this.wireModelName);
            }

            this.$dispatch(SPIRE_EVENTS.FILE_UPLOAD_REMOVED, createEventPayload({
                value: fileObj,
                metadata: { remainingFiles: this.files.length }
            }));
        },

        removeExistingFile(existingFile) {
            this.existingFiles = this.existingFiles.filter(f => f.id !== existingFile.id);

            if (this.$wire) {
                this.$wire.call(this.removeEvent, existingFile.id);
            }
        },

        uploadAllPending() {
            this.files
                .filter(f => f.status === 'pending')
                .forEach(f => this.uploadFile(f));
        },

        clearAll() {
            this.files.forEach(f => {
                if (f.previewUrl) {
                    URL.revokeObjectURL(f.previewUrl);
                }
            });

            this.files = [];
        },

        async uploadFromUrl() {
            const url = this.urlInput.trim();

            if (!url) {
                this.urlError = this.translations.urlInvalid;
                return;
            }

            try {
                new URL(url);
            } catch {
                this.urlError = this.translations.urlInvalid;
                return;
            }

            this.urlError = null;
            this.urlUploading = true;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const blob = await response.blob();

                let filename = '';
                const contentDisposition = response.headers.get('content-disposition');
                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                    if (filenameMatch && filenameMatch[1]) {
                        filename = filenameMatch[1].replace(/['"]/g, '');
                    }
                }

                if (!filename) {
                    try {
                        const urlObj = new URL(url);
                        filename = decodeURIComponent(urlObj.pathname.split('/').pop() || '');
                    } catch {
                        filename = url.split('/').pop().split('?')[0] || '';
                    }
                }

                filename = filename.split('?')[0].replace(/[<>:"/\\|?*]/g, '_').trim();

                if (!filename || !filename.includes('.')) {
                    const ext = getExtensionFromMimeType(blob.type);
                    const baseName = filename || `downloaded-file-${Date.now()}`;
                    filename = ext ? `${baseName}${ext}` : `${baseName}.bin`;
                }

                const file = new File([blob], filename, { type: blob.type });

                this.handleFiles([file]);

                this.urlInput = '';
                this.announceStatus(`File from URL added: ${filename}`);
            } catch (error) {
                console.error('[Spire FileUpload] URL fetch error:', error);

                const isCorsError = error instanceof TypeError &&
                    (error.message.includes('Failed to fetch') ||
                     error.message.includes('NetworkError') ||
                     error.message.includes('CORS'));

                if (isCorsError) {
                    this.urlError = this.translations.urlCorsError;
                    this.announceError(this.translations.urlCorsError);
                } else {
                    this.urlError = this.translations.urlError;
                    this.announceError(this.translations.urlError);
                }
            } finally {
                this.urlUploading = false;
            }
        },

        clearUrlError() {
            this.urlError = null;
        },

        addValidationError(message) {
            if (!this.validationErrors.includes(message)) {
                this.validationErrors.push(message);
            }

            this.announceError(message);

            if (this.validationErrorTimer) {
                clearTimeout(this.validationErrorTimer);
            }
            this.validationErrorTimer = setTimeout(() => {
                this.clearValidationErrors();
            }, 5000);
        },

        clearValidationErrors() {
            this.validationErrors = [];
            if (this.validationErrorTimer) {
                clearTimeout(this.validationErrorTimer);
                this.validationErrorTimer = null;
            }
        },

        get hasFiles() {
            return this.files.length > 0 || this.existingFiles.length > 0;
        },

        get isUploading() {
            return this.files.some(f => f.status === 'uploading');
        },

        get pendingCount() {
            return this.files.filter(f => f.status === 'pending').length;
        },

        get uploadedCount() {
            return this.files.filter(f => f.status === 'uploaded').length;
        },

        get errorCount() {
            return this.files.filter(f => f.status === 'error').length;
        },

        get totalProgress() {
            if (this.files.length === 0) return 0;
            const total = this.files.reduce((sum, f) => sum + f.progress, 0);
            return Math.round(total / this.files.length);
        },

        get canAddMore() {
            if (!this.maxFiles) return true;
            return (this.files.length + this.existingFiles.length) < this.maxFiles;
        },

        generateId() {
            return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        },

        formatFileSize(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        },

        isImage(type) {
            return type && type.startsWith('image/');
        },

        getFileIcon(type) {
            if (!type) return 'file';
            if (type.startsWith('image/')) return 'image';
            if (type.startsWith('video/')) return 'video';
            if (type.startsWith('audio/')) return 'music';
            if (type === 'application/pdf') return 'file-text';
            if (type.includes('spreadsheet') || type.includes('excel')) return 'table';
            if (type.includes('document') || type.includes('word')) return 'file-text';
            if (type.includes('zip') || type.includes('archive')) return 'archive';
            return 'file';
        },

        announceStatus(message) {
            const announcer = this.$refs.statusAnnouncer;
            if (announcer) {
                announcer.textContent = message;
            }
        },

        announceError(message) {
            const announcer = this.$refs.errorAnnouncer;
            if (announcer) {
                announcer.textContent = message;
            }

            console.warn('[Spire FileUpload]', message);
        },

        destroy() {
            this.files.forEach(f => {
                if (f.previewUrl) {
                    URL.revokeObjectURL(f.previewUrl);
                }
            });

            const zone = this.$refs.dropzone;
            if (zone && this.dragListeners) {
                Object.entries(this.dragListeners).forEach(([event, handler]) => {
                    zone.removeEventListener(event, handler);
                });
                this.dragListeners = null;
            }

            if (this.validationErrorTimer) {
                clearTimeout(this.validationErrorTimer);
                this.validationErrorTimer = null;
            }
        }
    };
}
