# Chart

A lightweight, zero-dependency tool for building charts in your Livewire applications. Designed to be simple but extremely flexible, allowing you to assemble and style your charts exactly as you need them.

Currently supports line and area charts. Additional chart types are planned for future releases.

## Basic Usage

```blade
<x-spire::chart wire:model="data" class="aspect-[3/1]">
    <x-spire::chart.svg>
        <x-spire::chart.line field="visitors" class="text-pink-500" />
        <x-spire::chart.axis axis="x" field="date">
            <x-spire::chart.axis.line />
            <x-spire::chart.axis.tick />
        </x-spire::chart.axis>
        <x-spire::chart.axis axis="y">
            <x-spire::chart.axis.grid />
            <x-spire::chart.axis.tick />
        </x-spire::chart.axis>
        <x-spire::chart.cursor />
    </x-spire::chart.svg>
    <x-spire::chart.tooltip>
        <x-spire::chart.tooltip.heading field="date" :format="['year' => 'numeric', 'month' => 'numeric', 'day' => 'numeric']" />
        <x-spire::chart.tooltip.value field="visitors" label="Visitors" />
    </x-spire::chart.tooltip>
</x-spire::chart>
```

## Data Structure

Charts expect a structured array of data, typically provided via `wire:model` or passed as a `:value` prop. Each data point should be an associative array with named fields:

```php
<?php
use Livewire\Component;

class Dashboard extends Component
{
    public array $data = [
        ['date' => '2025-11-19', 'visitors' => 267],
        ['date' => '2025-11-18', 'visitors' => 259],
        ['date' => '2025-11-17', 'visitors' => 269],
        // ...
    ];
}
```

### Using wire:model

```blade
<x-spire::chart wire:model="data" />
```

### Using :value prop

```blade
<x-spire::chart :value="$this->data" />
```

### Simple array of numbers

For sparklines or simple charts:

```blade
<x-spire::chart :value="[1, 2, 3, 4, 5]" />
```

## Examples

### Line Chart

```blade
<x-spire::chart wire:model="data" class="aspect-[3/1]">
    <x-spire::chart.svg>
        <x-spire::chart.line field="memory" class="text-pink-500" />
        <x-spire::chart.point field="memory" class="text-pink-400" />
        <x-spire::chart.axis axis="x" field="date">
            <x-spire::chart.axis.tick />
            <x-spire::chart.axis.line />
        </x-spire::chart.axis>
        <x-spire::chart.axis axis="y" :tick-values="[0, 128, 256, 384, 512]" :format="['style' => 'unit', 'unit' => 'megabyte']">
            <x-spire::chart.axis.grid />
            <x-spire::chart.axis.tick />
        </x-spire::chart.axis>
    </x-spire::chart.svg>
</x-spire::chart>
```

### Area Chart

```blade
<x-spire::chart wire:model="data" class="aspect-[3/1]">
    <x-spire::chart.svg>
        <x-spire::chart.line field="stock" class="text-blue-500" curve="none" />
        <x-spire::chart.area field="stock" class="text-blue-200/50" curve="none" />
        <x-spire::chart.axis axis="y" position="right" tick-prefix="$" :format="[
            'notation' => 'compact',
            'compactDisplay' => 'short',
            'maximumFractionDigits' => 1,
        ]">
            <x-spire::chart.axis.grid />
            <x-spire::chart.axis.tick />
        </x-spire::chart.axis>
        <x-spire::chart.axis axis="x" field="date">
            <x-spire::chart.axis.tick />
            <x-spire::chart.axis.line />
        </x-spire::chart.axis>
    </x-spire::chart.svg>
</x-spire::chart>
```

### Multiple Lines

```blade
<x-spire::chart wire:model="data">
    <x-spire::chart.viewport class="min-h-80">
        <x-spire::chart.svg>
            <x-spire::chart.line field="twitter" class="text-blue-500" curve="none" />
            <x-spire::chart.point field="twitter" class="text-blue-500" r="6" stroke-width="3" />
            <x-spire::chart.line field="facebook" class="text-red-500" curve="none" />
            <x-spire::chart.point field="facebook" class="text-red-500" r="6" stroke-width="3" />
            <x-spire::chart.line field="instagram" class="text-green-500" curve="none" />
            <x-spire::chart.point field="instagram" class="text-green-500" r="6" stroke-width="3" />
            <x-spire::chart.axis axis="x" field="date">
                <x-spire::chart.axis.tick />
                <x-spire::chart.axis.line />
            </x-spire::chart.axis>
            <x-spire::chart.axis axis="y" tick-start="0" tick-end="1" :format="[
                'style' => 'percent',
                'minimumFractionDigits' => 0,
                'maximumFractionDigits' => 0,
            ]">
                <x-spire::chart.axis.grid />
                <x-spire::chart.axis.tick />
            </x-spire::chart.axis>
        </x-spire::chart.svg>
    </x-spire::chart.viewport>
    <div class="flex justify-center gap-4 pt-4">
        <x-spire::chart.legend label="Instagram">
            <x-spire::chart.legend.indicator class="bg-green-400" />
        </x-spire::chart.legend>
        <x-spire::chart.legend label="Twitter">
            <x-spire::chart.legend.indicator class="bg-blue-400" />
        </x-spire::chart.legend>
        <x-spire::chart.legend label="Facebook">
            <x-spire::chart.legend.indicator class="bg-red-400" />
        </x-spire::chart.legend>
    </div>
</x-spire::chart>
```

### Live Summary

```blade
<x-spire::card>
    <x-spire::chart class="grid gap-6" wire:model="data">
        <x-spire::chart.summary class="flex gap-12">
            <div>
                <x-spire::text>Today</x-spire::text>
                <x-spire::heading size="xl" class="mt-2 tabular-nums">
                    <x-spire::chart.summary.value field="sales" :format="['style' => 'currency', 'currency' => 'USD']" />
                </x-spire::heading>
                <x-spire::text class="mt-2 tabular-nums">
                    <x-spire::chart.summary.value field="date" :format="['hour' => 'numeric', 'minute' => 'numeric', 'hour12' => true]" />
                </x-spire::text>
            </div>
        </x-spire::chart.summary>
        <x-spire::chart.viewport class="aspect-[3/1]">
            <x-spire::chart.svg>
                <x-spire::chart.line field="sales" class="text-sky-500" curve="none" />
                <x-spire::chart.axis axis="x" field="date">
                    <x-spire::chart.axis.grid />
                    <x-spire::chart.axis.tick />
                    <x-spire::chart.axis.line />
                </x-spire::chart.axis>
                <x-spire::chart.axis axis="y">
                    <x-spire::chart.axis.tick />
                </x-spire::chart.axis>
                <x-spire::chart.cursor />
            </x-spire::chart.svg>
        </x-spire::chart.viewport>
    </x-spire::chart>
</x-spire::card>
```

### Sparkline

Compact, single-line chart for quick visual insights:

```blade
<x-spire::chart :value="[15, 18, 16, 19, 22, 25, 28, 25, 29, 28, 32, 35]" class="w-20 aspect-[3/1]">
    <x-spire::chart.svg gutter="0">
        <x-spire::chart.line class="text-green-500" />
    </x-spire::chart.svg>
</x-spire::chart>
```

### Dashboard Stat

```blade
<x-spire::card class="overflow-hidden min-w-48">
    <x-spire::text>Revenue</x-spire::text>
    <x-spire::heading size="xl" class="mt-2 tabular-nums">$12,345</x-spire::heading>
    <x-spire::chart class="-mx-8 -mb-8 h-12" :value="[10, 12, 11, 13, 15, 14, 16, 18, 17, 19, 21, 20]">
        <x-spire::chart.svg gutter="0">
            <x-spire::chart.line class="text-sky-200 dark:text-sky-400" />
            <x-spire::chart.area class="text-sky-100 dark:text-sky-400/30" />
        </x-spire::chart.svg>
    </x-spire::chart>
</x-spire::card>
```

## Chart Sizing

**Important:** The chart component requires an explicit height or aspect ratio to be specified. Without it, the chart will not display properly.

```blade
<!-- Using aspect ratio (recommended for responsive charts) -->
<x-spire::chart class="aspect-[3/1]" wire:model="data">
    <!-- ... -->
</x-spire::chart>

<!-- Using explicit height -->
<x-spire::chart class="h-64" wire:model="data">
    <!-- ... -->
</x-spire::chart>

<!-- Sparklines use small explicit heights -->
<x-spire::chart class="w-20 h-8" :value="[15, 18, 22, 25, 28]">
    <x-spire::chart.svg gutter="0">
        <x-spire::chart.line class="text-green-500" />
    </x-spire::chart.svg>
</x-spire::chart>

<!-- Dashboard stat with flexible width but fixed height -->
<x-spire::chart class="w-full h-12" :value="[10, 12, 15, 18, 21]">
    <!-- ... -->
</x-spire::chart>
```

### Why Explicit Height is Required

Charts need a defined height to:
- Calculate proper coordinate systems and scales
- Position axis labels and tick marks correctly
- Render SVG elements at the right dimensions
- Prevent layout shifts during data updates

**For sparklines:** Use explicit small heights like `h-8`, `h-10`, or `h-12` to keep them compact.

**For full charts:** Use aspect ratios like `aspect-[3/1]` or `aspect-[2/1]` for responsive sizing, or fixed heights like `h-64`, `h-80` for consistent dimensions.

### Charts with Summaries or Legends

**Important:** When including summaries or legends inside the chart wrapper, apply the aspect-ratio to the **viewport component**, not the chart wrapper. This ensures the SVG has the full aspect-ratio space without summaries/legends consuming vertical height.

```blade
<!-- ✅ Correct: aspect-ratio on viewport -->
<x-spire::chart wire:model="data" class="grid gap-4">
    <div class="flex gap-6">
        <!-- Summary indicators here -->
    </div>

    <x-spire::chart.viewport class="aspect-[3/1]">
        <x-spire::chart.svg>
            <!-- Chart content -->
        </x-spire::chart.svg>
    </x-spire::chart.viewport>
</x-spire::chart>

<!-- ❌ Incorrect: aspect-ratio on chart wrapper with summary inside -->
<x-spire::chart wire:model="data" class="aspect-[3/1]">
    <div><!-- Summary --></div>
    <x-spire::chart.svg>
        <!-- SVG gets reduced height, causing overflow -->
    </x-spire::chart.svg>
</x-spire::chart>
```

**Why this matters:** The aspect-ratio creates a fixed-height container. If summary/legend elements are inside, they consume vertical space, leaving less room for the SVG. Since the chart's gutter calculations happen in SVG coordinate space, this can cause axis labels to extend beyond the visible area.

## Chart Padding (Gutter)

By default, the chart has 8px padding on all sides. Control this with the `gutter` attribute:

```blade
<x-spire::chart.svg gutter="12 0 12 8">
    <!-- ... -->
</x-spire::chart.svg>
```

Accepts 1-4 values (like CSS padding shorthand):
- `gutter="8"` - All sides 8px
- `gutter="8 16"` - Top/bottom 8px, left/right 16px
- `gutter="8 16 24"` - Top 8px, left/right 16px, bottom 24px
- `gutter="8 16 24 32"` - Top 8px, right 16px, bottom 24px, left 32px

For sparklines, set `gutter="0"` to remove padding.

## Axis Configuration

### Axis Scale

```blade
<x-spire::chart.axis axis="y" scale="linear">
    <!-- ... -->
</x-spire::chart.axis>
```

Scale types:
- `categorical` - For names or categories
- `linear` - For numeric data (default for Y axis)
- `time` - For date/time data (auto-detected for X axis)

### Axis Position

```blade
<x-spire::chart.axis axis="y" position="right">
    <!-- ... -->
</x-spire::chart.axis>
```

### Grid Lines

```blade
<x-spire::chart.axis axis="y">
    <x-spire::chart.axis.grid class="text-zinc-200/50" stroke-width="1" stroke-dasharray="4,4" />
</x-spire::chart.axis>
```

### Tick Configuration

```blade
<x-spire::chart.axis
    axis="y"
    tick-count="5"
    tick-start="0"
    tick-end="100"
    tick-prefix="$"
    tick-suffix="K"
>
    <x-spire::chart.axis.tick />
</x-spire::chart.axis>
```

Explicit tick values:

```blade
<x-spire::chart.axis axis="y" :tick-values="[0, 128, 256, 384, 512]">
    <x-spire::chart.axis.tick />
</x-spire::chart.axis>
```

## Formatting

Uses JavaScript's `Intl.NumberFormat` and `Intl.DateTimeFormat` APIs for locale-aware formatting.

### Number Formatting

```blade
<x-spire::chart.axis axis="y" :format="['style' => 'currency', 'currency' => 'USD']" />
```

Common formats:
- Currency: `['style' => 'currency', 'currency' => 'USD']`
- Percent: `['style' => 'percent']`
- Compact: `['notation' => 'compact']`
- Custom unit: `['style' => 'unit', 'unit' => 'megabyte']`

### Date Formatting

```blade
<x-spire::chart.axis axis="x" field="date" :format="['month' => 'long', 'day' => 'numeric']" />
```

Common formats:
- Full date: `['dateStyle' => 'full']`
- Month/day: `['month' => 'long', 'day' => 'numeric']`
- Time: `['hour' => 'numeric', 'minute' => 'numeric', 'hour12' => true]`

## Interactive Features

### Cursor

```blade
<x-spire::chart.svg>
    <!-- ... -->
    <x-spire::chart.cursor class="text-zinc-800" stroke-width="1" stroke-dasharray="4,4" />
</x-spire::chart.svg>
```

### Tooltip

```blade
<x-spire::chart.tooltip>
    <x-spire::chart.tooltip.heading field="date" :format="['month' => 'short', 'day' => 'numeric']" />
    <x-spire::chart.tooltip.value field="visitors" label="Visitors" />
    <x-spire::chart.tooltip.value field="views" label="Views" :format="['notation' => 'compact']" />
</x-spire::chart.tooltip>
```

## Reference

### x-spire::chart

| Prop | Description |
|------|-------------|
| `wire:model` | Binds to a Livewire property containing chart data |
| `value` | Array of data points (use when not using wire:model) |
| `curve` | Default curve type: `smooth` (default), `none` |

### x-spire::chart.svg

| Prop | Description |
|------|-------------|
| `gutter` | Padding around the chart (default: 8) |

### x-spire::chart.line

| Prop | Description |
|------|-------------|
| `field` | Data field to plot |
| `curve` | Curve type: `smooth`, `none` |

### x-spire::chart.area

| Prop | Description |
|------|-------------|
| `field` | Data field to plot |
| `curve` | Curve type: `smooth`, `none` |

### x-spire::chart.point

| Prop | Description |
|------|-------------|
| `field` | Data field to plot |
| `r` | Point radius (default: 4) |
| `stroke-width` | Stroke width (default: 2) |

### x-spire::chart.axis

| Prop | Description |
|------|-------------|
| `axis` | `x` or `y` |
| `field` | Data field for x-axis labels |
| `scale` | `linear`, `time`, `categorical` |
| `position` | `top`, `bottom`, `left`, `right` |
| `tick-count` | Target number of ticks |
| `tick-start` | Starting tick value: `auto`, `min`, `0`, or number |
| `tick-end` | Ending tick value: `auto`, `max`, or number |
| `tick-values` | Explicit array of tick values |
| `tick-prefix` | Prefix for tick labels |
| `tick-suffix` | Suffix for tick labels |
| `format` | Intl formatting options |

### x-spire::chart.tooltip.value

| Prop | Description |
|------|-------------|
| `field` | Data field to display |
| `label` | Label text |
| `format` | Intl formatting options |

### x-spire::chart.summary.value

| Prop | Description |
|------|-------------|
| `field` | Data field to display |
| `fallback` | Default value when not hovering |
| `format` | Intl formatting options |

### x-spire::chart.legend

| Prop | Description |
|------|-------------|
| `label` | Legend label text |

## Styling

All chart elements use Tailwind classes for styling:

```blade
<!-- Line color -->
<x-spire::chart.line class="text-pink-500" />

<!-- Area with transparency -->
<x-spire::chart.area class="text-blue-200/50" />

<!-- Grid line styling -->
<x-spire::chart.axis.grid class="text-zinc-200" stroke-dasharray="4,4" />

<!-- Legend indicator -->
<x-spire::chart.legend.indicator class="bg-green-400" />
```

Charts automatically support dark mode through Spire UI's semantic color tokens.

## Troubleshooting

### Chart Content Extending Beyond Boundaries

If you notice chart elements (points, lines, or text) extending beyond the chart container's top or bottom boundaries:

**Solution 1: Check summary/legend placement**
If your chart includes summary or legend components inside the wrapper, ensure the aspect-ratio is on the **viewport**, not the chart wrapper:

```blade
<!-- ✅ Correct -->
<x-spire::chart wire:model="data" class="grid gap-4">
    <div><!-- Summary/Legend here --></div>
    <x-spire::chart.viewport class="aspect-[3/1]">
        <x-spire::chart.svg><!-- Chart --></x-spire::chart.svg>
    </x-spire::chart.viewport>
</x-spire::chart>

<!-- ❌ Causes overflow -->
<x-spire::chart class="aspect-[3/1]">
    <div><!-- Summary steals height from SVG --></div>
    <x-spire::chart.svg><!-- Labels extend beyond boundary --></x-spire::chart.svg>
</x-spire::chart>
```

**Solution 2: Ensure proper sizing**
Always specify an explicit height or aspect ratio on the chart component (or viewport if using summaries):

```blade
<x-spire::chart class="aspect-[3/1]" wire:model="data">
    <!-- ... -->
</x-spire::chart>
```

**Solution 3: Adjust gutter for large points**
If you're using large point sizes, increase the gutter to accommodate them:

```blade
<x-spire::chart.svg gutter="16 8 16 8">
    <x-spire::chart.point field="value" r="8" stroke-width="4" />
</x-spire::chart.svg>
```

The chart component automatically calculates appropriate gutter spacing based on:
- Standard point sizes (default r="4", stroke-width="2")
- Font sizes used in tick labels and axis text
- 5% Y-domain padding for visual breathing room

The auto-gutter calculation includes buffer space to prevent:
- Points from extending beyond boundaries
- Text descenders from clipping at bottom
- Axis labels from being cut off

For custom configurations with larger point sizes (r > 6) or custom fonts, manual gutter adjustment may be needed.

**Note:** Auto-gutter is enabled by default and automatically adjusts to accommodate most standard configurations. Explicit gutter values override the auto-calculation.
