@props([
    'position' => 'bottom-right',
    'duration' => 5000,
    'variant' => 'solid',
])

@php
    $closeLabel = __('spire-ui::spire-ui.toast.close');
@endphp

<div
    x-data="spireToast({ position: '{{ $position }}', duration: {{ $duration }}, variant: '{{ $variant }}' })"
    {{ $attributes }}
>
    <template x-for="toast in toasts" :key="toast.id">
        <div
            :id="`toast-${toast.id}`"
            popover="manual"
            :style="getToastStyles(toast)"
            @mouseenter="pauseTimer(toast)"
            @mouseleave="resumeTimer(toast)"
            role="alert"
            :aria-live="toast.color === 'error' ? 'assertive' : 'polite'"
            :data-spire-color="toast.color"
            :data-spire-position="position"
            :data-spire-dismissible="toast.dismissible"
            x-bind:class="{
                'spire-toast': true,
                'pointer-events-auto': true,
                [`spire-toast--${toast.color}-${toast.variant}`]: true,
                'animate-slide-right': ['top-right', 'bottom-right'].includes(position),
                'animate-slide-left': ['top-left', 'bottom-left'].includes(position),
                'animate-slide-up': ['top-center', 'bottom-center'].includes(position)
            }"
        >
            <div
                x-show="toast.showProgress && toast.progress !== null"
                class="spire-toast-progress"
                :style="`width: ${toast.progress}%`"
            ></div>

            <div class="spire-toast-content">
                <div class="spire-toast-icon">
                    <x-spire::icon x-show="toast.color === 'success'" name="check-circle" class="w-5 h-5" />
                    <x-spire::icon x-show="toast.color === 'error'" name="alert-circle" class="w-5 h-5" />
                    <x-spire::icon x-show="toast.color === 'warning'" name="alert-triangle" class="w-5 h-5" />
                    <x-spire::icon x-show="toast.color === 'info'" name="info" class="w-5 h-5" />
                    <x-spire::icon x-show="toast.color === 'default'" name="bell" class="w-5 h-5" />
                </div>

                <div class="spire-toast-text">
                    <h5 x-show="toast.title" x-text="toast.title" class="spire-toast-title"></h5>
                    <p x-show="toast.message" x-text="toast.message" class="spire-toast-message"></p>
                </div>

                <x-spire::button
                    x-show="toast.dismissible"
                    variant="ghost"
                    color="default"
                    size="sm"
                    iconOnly
                    @click="removeToast(toast.id)"
                    :ariaLabel="$closeLabel"
                    class="spire-toast-dismiss"
                >
                    <x-spire::icon name="x" class="w-4 h-4" />
                </x-spire::button>
            </div>
        </div>
    </template>
</div>
