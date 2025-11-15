@props([
    'label' => '',
    'icon' => null,
    'disabled' => false,
    'placement' => 'right-start',
])

@php
    use SpireUI\Support\ComponentStyles;

    $classString = ComponentStyles::buildClassString([
        ComponentStyles::dropdownItemBase(),
        ComponentStyles::dropdownItemState($disabled, false),
    ]);

    $panelClassString = ComponentStyles::buildClassString([
        ComponentStyles::dropdownContentBase(),
        ComponentStyles::dropdownContentWidth('sm'),
        'animate-dropdown-bounce',
    ]);
@endphp

<div
    x-data="{
        disabled: {{ $disabled ? 'true' : 'false' }},
        ...overlay({
            trigger: 'hover'
        }),
        show() {
            if (this.disabled) return;
            this.$refs.content?.showPopover();
        }
    }"
    x-id="['submenu-trigger', 'submenu-popover']"
    {{ $attributes }}
>
    <div x-ref="trigger" :id="$id('submenu-trigger')">
        <button
            type="button"
            class="{{ $classString }}"
            role="menuitem"
            aria-haspopup="true"
            :aria-expanded="open"
            {{ $disabled ? 'disabled' : '' }}
        >
            @if($icon)
                <x-spire::icon :name="$icon" class="w-4 h-4 shrink-0" />
            @endif

            <span class="flex-1 text-left">{{ $label }}</span>

            <x-spire::icon name="chevron-right" class="w-4 h-4 shrink-0" />
        </button>
    </div>

    <div
        x-ref="content"
        :id="$id('submenu-popover')"
        anchor="$id('submenu-trigger')"
        popover="auto"
        class="{{ $panelClassString }}"
        role="menu"
        data-placement="{{ $placement }}"
    >
        {{ $slot }}
    </div>
</div>
