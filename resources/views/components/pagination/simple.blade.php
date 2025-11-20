@php
use SpireUI\Support\ComponentClass;

if (!$paginator->hasPages()) {
    return;
}

$size = $size ?? 'md';
$previousLabel = $previousLabel ?? __('Previous');
$nextLabel = $nextLabel ?? __('Next');

$builder = ComponentClass::make('pagination')
    ->size($size);

$isLivewire = isset($this) && method_exists($this, 'gotoPage');
$pageName = $paginator->getPageName();
@endphp

@if ($paginator->hasPages())
    <nav class="{{ $builder->build() }}"
         role="navigation"
         aria-label="{{ __('Pagination Navigation') }}">

        <div class="spire-pagination__nav">
            @if ($paginator->onFirstPage())
                <span class="spire-pagination__button spire-pagination__button--disabled" aria-disabled="true">
                    <x-spire::icon name="chevron-left" class="spire-pagination__icon" />
                    <span>{{ $previousLabel }}</span>
                </span>
            @else
                @if ($isLivewire)
                    <button type="button"
                            wire:click="previousPage('{{ $pageName }}')"
                            class="spire-pagination__button">
                        <x-spire::icon name="chevron-left" class="spire-pagination__icon" />
                        <span>{{ $previousLabel }}</span>
                    </button>
                @else
                    <a href="{{ $paginator->previousPageUrl() }}"
                       rel="prev"
                       class="spire-pagination__button">
                        <x-spire::icon name="chevron-left" class="spire-pagination__icon" />
                        <span>{{ $previousLabel }}</span>
                    </a>
                @endif
            @endif

            @if ($paginator->hasMorePages())
                @if ($isLivewire)
                    <button type="button"
                            wire:click="nextPage('{{ $pageName }}')"
                            class="spire-pagination__button">
                        <span>{{ $nextLabel }}</span>
                        <x-spire::icon name="chevron-right" class="spire-pagination__icon" />
                    </button>
                @else
                    <a href="{{ $paginator->nextPageUrl() }}"
                       rel="next"
                       class="spire-pagination__button">
                        <span>{{ $nextLabel }}</span>
                        <x-spire::icon name="chevron-right" class="spire-pagination__icon" />
                    </a>
                @endif
            @else
                <span class="spire-pagination__button spire-pagination__button--disabled" aria-disabled="true">
                    <span>{{ $nextLabel }}</span>
                    <x-spire::icon name="chevron-right" class="spire-pagination__icon" />
                </span>
            @endif
        </div>
    </nav>
@endif
