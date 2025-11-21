@props([
    'platform',
    'url',
    'title' => '',
    'iconOnly' => true,
    'size' => 'md',
    'variant' => 'ghost',
    'color' => 'default',
    'radius' => 'md',
])

@php
    $iconOnly = filter_var($iconOnly, FILTER_VALIDATE_BOOLEAN);

    $platforms = [
        'facebook' => [
            'label' => 'Facebook',
            'url' => 'https://www.facebook.com/sharer/sharer.php?u=' . urlencode($url),
            'icon' => 'facebook',
        ],
        'x' => [
            'label' => 'X',
            'url' => 'https://twitter.com/intent/tweet?url=' . urlencode($url) . '&text=' . urlencode($title),
            'icon' => 'x',
        ],
        'twitter' => [
            'label' => 'Twitter',
            'url' => 'https://twitter.com/intent/tweet?url=' . urlencode($url) . '&text=' . urlencode($title),
            'icon' => 'x',
        ],
        'linkedin' => [
            'label' => 'LinkedIn',
            'url' => 'https://www.linkedin.com/sharing/share-offsite?url=' . urlencode($url),
            'icon' => 'linkedin',
        ],
        'whatsapp' => [
            'label' => 'WhatsApp',
            'url' => 'https://wa.me/?text=' . urlencode($title . ' ' . $url),
            'icon' => 'whatsapp',
        ],
        'email' => [
            'label' => 'Email',
            'url' => 'mailto:?subject=' . rawurlencode($title) . '&body=' . rawurlencode($url),
            'icon' => 'email',
        ],
        'reddit' => [
            'label' => 'Reddit',
            'url' => 'https://www.reddit.com/submit?url=' . urlencode($url) . '&title=' . urlencode($title),
            'icon' => 'reddit',
        ],
        'telegram' => [
            'label' => 'Telegram',
            'url' => 'https://t.me/share/url?url=' . urlencode($url) . '&text=' . urlencode($title),
            'icon' => 'telegram',
        ],
        'pinterest' => [
            'label' => 'Pinterest',
            'url' => 'https://pinterest.com/pin/create/button/?url=' . urlencode($url) . '&description=' . urlencode($title),
            'icon' => 'pinterest',
        ],
        'native' => [
            'label' => 'Share',
            'url' => null,
            'icon' => 'native',
        ],
    ];

    $config = $platforms[$platform] ?? null;
    $isNative = $platform === 'native';
@endphp

@if($config)
    @if($isNative)
        @if($iconOnly)
        <x-spire::tooltip :content="$config['label']">
        @endif
            <button
                type="button"
                x-data="{
                    canShare: typeof navigator.share === 'function',
                    async share() {
                        try {
                            await navigator.share({
                                title: @js($title),
                                url: @js($url),
                            });
                        } catch (err) {
                            if (err.name !== 'AbortError') {
                                console.error('Share failed:', err);
                            }
                        }
                    }
                }"
                x-show="canShare"
                x-on:click="share()"
                {{ $attributes->class([
                    'spire-button',
                    'spire-button--' . $size,
                    'spire-button--' . $color . '-' . $variant,
                    'spire-button--icon-only' => $iconOnly,
                    'rounded-' . $radius => $radius !== 'none',
                ]) }}
                aria-label="{{ $config['label'] }}"
            >
                @include('spire::components.social-share.socials.' . $config['icon'])
                @unless($iconOnly)
                    <span>{{ $config['label'] }}</span>
                @endunless
            </button>
        @if($iconOnly)
        </x-spire::tooltip>
        @endif
    @else
        @if($iconOnly)
        <x-spire::tooltip content="Share on {{ $config['label'] }}">
        @endif
            <a
                href="{{ $config['url'] }}"
                target="_blank"
                rel="noopener noreferrer"
                onclick="window.open(this.href, '{{ $config['label'] }}', 'width=600,height=400,scrollbars=yes'); return false;"
                {{ $attributes->class([
                    'spire-button',
                    'spire-button--' . $size,
                    'spire-button--' . $color . '-' . $variant,
                    'spire-button--icon-only' => $iconOnly,
                    'rounded-' . $radius => $radius !== 'none',
                ]) }}
                aria-label="Share on {{ $config['label'] }}"
            >
                @include('spire::components.social-share.socials.' . $config['icon'])
                @unless($iconOnly)
                    <span>{{ $config['label'] }}</span>
                @endunless
            </a>
        @if($iconOnly)
        </x-spire::tooltip>
        @endif
    @endif
@endif
