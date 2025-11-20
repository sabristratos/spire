@props(['presets' => []])

<div class="spire-calendar-presets">
    @foreach($presets as $preset)
        <x-spire::calendar.preset-item :preset="$preset" />
    @endforeach
</div>
