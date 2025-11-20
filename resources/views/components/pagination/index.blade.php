@props([
    'paginator' => null,
    'variant' => 'default',
    'size' => 'md',
    'onEachSide' => 1,
    'showInfo' => false,
    'showFirstLast' => true,
    'previousLabel' => null,
    'nextLabel' => null,
])

@php
use SpireUI\Support\ComponentClass;

if (!$paginator || !$paginator->hasPages()) {
    return;
}

$builder = ComponentClass::make('pagination')
    ->size($size)
    ->dataAttribute('variant', $variant);

$isLivewire = isset($this) && method_exists($this, 'gotoPage');
$pageName = $paginator->getPageName();

// Set onEachSide for URL window calculation
$paginator->onEachSide($onEachSide);

// Get page elements with ellipsis using UrlWindow
$window = \Illuminate\Pagination\UrlWindow::make($paginator);
$elements = [];

if (is_array($window['first'])) {
    $elements[] = $window['first'];
}

if (is_array($window['slider'])) {
    if (!empty($window['first']) && max(array_keys($window['first'])) < min(array_keys($window['slider'])) - 1) {
        $elements[] = '...';
    }
    $elements[] = $window['slider'];
}

if (is_array($window['last'])) {
    $lastSliderPage = is_array($window['slider']) ? max(array_keys($window['slider'])) : (is_array($window['first']) ? max(array_keys($window['first'])) : 0);
    if ($lastSliderPage < min(array_keys($window['last'])) - 1) {
        $elements[] = '...';
    }
    $elements[] = $window['last'];
}
@endphp

@if ($paginator->hasPages())
    <nav {{ $attributes->merge(['class' => $builder->build(), ...$builder->getDataAttributes()]) }}
         role="navigation"
         aria-label="{{ __('Pagination Navigation') }}">

        @if ($showInfo && method_exists($paginator, 'total'))
            <div class="spire-pagination__info">
                <span>{{ __('Showing') }}</span>
                <span class="font-medium">{{ $paginator->firstItem() ?? 0 }}</span>
                <span>{{ __('to') }}</span>
                <span class="font-medium">{{ $paginator->lastItem() ?? 0 }}</span>
                <span>{{ __('of') }}</span>
                <span class="font-medium">{{ $paginator->total() }}</span>
                <span>{{ __('results') }}</span>
            </div>
        @endif

        <div class="spire-pagination__nav">
            @if ($variant === 'simple')
                {{-- Simple: Previous/Next only --}}
                @if ($paginator->onFirstPage())
                    <span class="spire-pagination__button spire-pagination__button--disabled" aria-disabled="true">
                        <x-spire::icon name="chevron-left" class="spire-pagination__icon" />
                        <span>{{ $previousLabel ?? __('Previous') }}</span>
                    </span>
                @else
                    @if ($isLivewire)
                        <button type="button"
                                wire:click="previousPage('{{ $pageName }}')"
                                class="spire-pagination__button">
                            <x-spire::icon name="chevron-left" class="spire-pagination__icon" />
                            <span>{{ $previousLabel ?? __('Previous') }}</span>
                        </button>
                    @else
                        <a href="{{ $paginator->previousPageUrl() }}"
                           rel="prev"
                           class="spire-pagination__button">
                            <x-spire::icon name="chevron-left" class="spire-pagination__icon" />
                            <span>{{ $previousLabel ?? __('Previous') }}</span>
                        </a>
                    @endif
                @endif

                @if ($paginator->hasMorePages())
                    @if ($isLivewire)
                        <button type="button"
                                wire:click="nextPage('{{ $pageName }}')"
                                class="spire-pagination__button">
                            <span>{{ $nextLabel ?? __('Next') }}</span>
                            <x-spire::icon name="chevron-right" class="spire-pagination__icon" />
                        </button>
                    @else
                        <a href="{{ $paginator->nextPageUrl() }}"
                           rel="next"
                           class="spire-pagination__button">
                            <span>{{ $nextLabel ?? __('Next') }}</span>
                            <x-spire::icon name="chevron-right" class="spire-pagination__icon" />
                        </a>
                    @endif
                @else
                    <span class="spire-pagination__button spire-pagination__button--disabled" aria-disabled="true">
                        <span>{{ $nextLabel ?? __('Next') }}</span>
                        <x-spire::icon name="chevron-right" class="spire-pagination__icon" />
                    </span>
                @endif
            @else
                {{-- Default: Full pagination with page numbers --}}

                {{-- First Page --}}
                @if ($showFirstLast && $paginator->currentPage() > 2)
                    @if ($isLivewire)
                        <button type="button"
                                wire:click="gotoPage(1, '{{ $pageName }}')"
                                class="spire-pagination__button spire-pagination__button--icon"
                                aria-label="{{ __('Go to first page') }}">
                            <x-spire::icon name="chevrons-left" class="spire-pagination__icon" />
                        </button>
                    @else
                        <a href="{{ $paginator->url(1) }}"
                           class="spire-pagination__button spire-pagination__button--icon"
                           aria-label="{{ __('Go to first page') }}">
                            <x-spire::icon name="chevrons-left" class="spire-pagination__icon" />
                        </a>
                    @endif
                @endif

                {{-- Previous Page --}}
                @if ($paginator->onFirstPage())
                    <span class="spire-pagination__button spire-pagination__button--icon spire-pagination__button--disabled" aria-disabled="true">
                        <x-spire::icon name="chevron-left" class="spire-pagination__icon" />
                    </span>
                @else
                    @if ($isLivewire)
                        <button type="button"
                                wire:click="previousPage('{{ $pageName }}')"
                                class="spire-pagination__button spire-pagination__button--icon"
                                aria-label="{{ __('Go to previous page') }}">
                            <x-spire::icon name="chevron-left" class="spire-pagination__icon" />
                        </button>
                    @else
                        <a href="{{ $paginator->previousPageUrl() }}"
                           rel="prev"
                           class="spire-pagination__button spire-pagination__button--icon"
                           aria-label="{{ __('Go to previous page') }}">
                            <x-spire::icon name="chevron-left" class="spire-pagination__icon" />
                        </a>
                    @endif
                @endif

                {{-- Page Numbers --}}
                @foreach ($elements as $element)
                    @if (is_string($element))
                        <span class="spire-pagination__ellipsis">{{ $element }}</span>
                    @endif

                    @if (is_array($element))
                        @foreach ($element as $page => $url)
                            @if ($page == $paginator->currentPage())
                                <span class="spire-pagination__button spire-pagination__button--active" aria-current="page">
                                    {{ $page }}
                                </span>
                            @else
                                @if ($isLivewire)
                                    <button type="button"
                                            wire:click="gotoPage({{ $page }}, '{{ $pageName }}')"
                                            class="spire-pagination__button"
                                            aria-label="{{ __('Go to page :page', ['page' => $page]) }}">
                                        {{ $page }}
                                    </button>
                                @else
                                    <a href="{{ $url }}"
                                       class="spire-pagination__button"
                                       aria-label="{{ __('Go to page :page', ['page' => $page]) }}">
                                        {{ $page }}
                                    </a>
                                @endif
                            @endif
                        @endforeach
                    @endif
                @endforeach

                {{-- Next Page --}}
                @if ($paginator->hasMorePages())
                    @if ($isLivewire)
                        <button type="button"
                                wire:click="nextPage('{{ $pageName }}')"
                                class="spire-pagination__button spire-pagination__button--icon"
                                aria-label="{{ __('Go to next page') }}">
                            <x-spire::icon name="chevron-right" class="spire-pagination__icon" />
                        </button>
                    @else
                        <a href="{{ $paginator->nextPageUrl() }}"
                           rel="next"
                           class="spire-pagination__button spire-pagination__button--icon"
                           aria-label="{{ __('Go to next page') }}">
                            <x-spire::icon name="chevron-right" class="spire-pagination__icon" />
                        </a>
                    @endif
                @else
                    <span class="spire-pagination__button spire-pagination__button--icon spire-pagination__button--disabled" aria-disabled="true">
                        <x-spire::icon name="chevron-right" class="spire-pagination__icon" />
                    </span>
                @endif

                {{-- Last Page --}}
                @if ($showFirstLast && method_exists($paginator, 'lastPage') && $paginator->currentPage() < $paginator->lastPage() - 1)
                    @if ($isLivewire)
                        <button type="button"
                                wire:click="gotoPage({{ $paginator->lastPage() }}, '{{ $pageName }}')"
                                class="spire-pagination__button spire-pagination__button--icon"
                                aria-label="{{ __('Go to last page') }}">
                            <x-spire::icon name="chevrons-right" class="spire-pagination__icon" />
                        </button>
                    @else
                        <a href="{{ $paginator->url($paginator->lastPage()) }}"
                           class="spire-pagination__button spire-pagination__button--icon"
                           aria-label="{{ __('Go to last page') }}">
                            <x-spire::icon name="chevrons-right" class="spire-pagination__icon" />
                        </a>
                    @endif
                @endif
            @endif
        </div>
    </nav>
@endif
