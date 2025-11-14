@props(['presets' => []])

<div class="flex flex-col gap-0.5 py-0 pr-2 border-r border-border">
    <span class="px-2 py-1.5 text-xs font-semibold text-text-muted uppercase tracking-wide">
        {{ __('spire::spire-ui.date.presets') }}
    </span>

    @foreach($presets as $preset)
        <x-spire::calendar.preset-item :preset="$preset" />
    @endforeach
</div>
