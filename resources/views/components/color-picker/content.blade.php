@props([
    'placement' => 'bottom-start',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('color-picker-content')
    ->addClass('spire-overlay')
    ->addClass('spire-overlay--padded-sm')
    ->addClass('animate-dropdown-bounce');

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->except(['class'])->merge([
    'data-placement' => $placement,
    'popover' => 'auto',
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
    'role' => 'dialog',
    'aria-label' => __('spire::spire-ui.color-picker.aria_label'),
]);
@endphp

<div
    :id="$id('popover')"
    x-ref="content"
    @toggle="handleToggle"
    @keydown.escape="hide"
    tabindex="-1"
    {{ $mergedAttributes }}
>
    <div class="flex flex-col gap-3 p-2 w-64">
        <div
            class="relative h-40 rounded-md overflow-hidden cursor-crosshair border border-border"
            @mousedown="handleGradientMouseDown($event)"
        >
            <canvas
                x-ref="gradientCanvas"
                width="256"
                height="160"
                class="w-full h-full"
            ></canvas>

            <div
                class="absolute w-4 h-4 border-2 border-white rounded-full shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                :style="'left: ' + saturation + '%; top: ' + (100 - lightness) + '%; background-color: ' + currentHex"
            ></div>
        </div>

        <div
            class="relative h-3 rounded-full cursor-pointer"
            style="background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
            x-ref="hueSlider"
            @mousedown="handleHueMouseDown($event)"
        >
            <div
                class="absolute w-4 h-4 border-2 border-white rounded-full shadow-md -translate-x-1/2 -translate-y-1/4 pointer-events-none"
                :style="'left: ' + (hue / 360 * 100) + '%; background-color: ' + hueColor"
            ></div>
        </div>

        <div class="flex items-center gap-2" x-ref="hexInputWrapper">
            <div
                class="shrink-0 w-10 h-10 rounded-md border border-border"
                :style="'background-color: ' + currentHex"
            ></div>

            <x-spire::input
                x-model="hexInput"
                type="text"
                size="sm"
                placeholder="#000000"
                class="font-mono"
                @input="handleHexInput($event)"
                @keydown.enter.prevent="selectColor()"
            />
        </div>

        <div class="grid grid-cols-10 gap-1">
            <template x-for="color in presets" :key="color">
                <button
                    type="button"
                    class="w-5 h-5 rounded border border-border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    :style="'background-color: ' + color"
                    :class="{ 'ring-2 ring-primary': value === color }"
                    :title="color"
                    @click="selectPreset(color)"
                ></button>
            </template>
        </div>

        <x-spire::separator class="mt-2" />

        <div class="flex justify-end gap-2">
            <x-spire::button
                type="button"
                variant="ghost"
                size="sm"
                @click="hide()"
            >
                {{ __('spire::spire-ui.common.cancel') }}
            </x-spire::button>

            <x-spire::button
                type="button"
                variant="solid"
                color="primary"
                size="sm"
                @click="selectColor()"
            >
                {{ __('spire::spire-ui.color-picker.select') }}
            </x-spire::button>
        </div>
    </div>
</div>
