@props([
    'size' => config('spire-ui.defaults.breadcrumbs.size', 'md'),
    'separator' => config('spire-ui.defaults.breadcrumbs.separator', 'chevron-right'),
    'separatorText' => null,
    'maxVisible' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('breadcrumbs')
    ->size($size);

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$useAlpine = $maxVisible !== null;
$separatorIcon = $separatorText ? null : $separator;
@endphp

<nav
    {{ $attributes->except(['class'])->merge([
        'class' => $builder->build(),
        ...$builder->getDataAttributes(),
        'aria-label' => __('spire::spire-ui.breadcrumbs.label'),
    ]) }}
    @if($useAlpine)
        x-data="spireBreadcrumbs({ maxVisible: {{ $maxVisible }} })"
        x-id="['popover']"
    @endif
>
    <ol class="spire-breadcrumbs__list">
        @if($useAlpine)
            {{-- Collapse trigger (hidden by default, shown via JS when needed) --}}
            <li class="spire-breadcrumbs__item" data-spire-breadcrumb-collapse style="display: none;">
                <div class="spire-breadcrumbs__collapse">
                    <button
                        type="button"
                        x-ref="trigger"
                        @click="toggle()"
                        :aria-expanded="open"
                        class="spire-breadcrumbs__collapse-trigger"
                        aria-label="{{ __('spire::spire-ui.breadcrumbs.show_hidden') }}"
                    >
                        <x-spire::icon name="ellipsis" class="spire-breadcrumbs__icon" />
                    </button>

                    <div
                        x-ref="content"
                        popover
                        class="spire-breadcrumbs__collapse-content"
                        role="menu"
                    >
                        <template x-for="(item, index) in collapsedItems" :key="index">
                            <button
                                type="button"
                                @click="navigateTo(item.href)"
                                class="spire-breadcrumbs__collapse-item"
                                role="menuitem"
                            >
                                <template x-if="item.icon">
                                    <x-spire::icon x-bind:name="item.icon" class="spire-breadcrumbs__collapse-item-icon" />
                                </template>
                                <span x-text="item.text"></span>
                            </button>
                        </template>
                    </div>
                </div>

                @if($separatorIcon)
                    <span class="spire-breadcrumbs__separator" aria-hidden="true">
                        <x-spire::icon :name="$separatorIcon" class="spire-breadcrumbs__separator-icon" />
                    </span>
                @else
                    <span class="spire-breadcrumbs__separator spire-breadcrumbs__separator-text" aria-hidden="true">
                        {{ $separatorText }}
                    </span>
                @endif
            </li>
        @endif

        {{ $slot }}
    </ol>
</nav>
