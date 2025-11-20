export function chartComponent(config = {}) {
    return {
        value: config.value || [],
        normalizedData: [],
        fields: [],

        hoveredIndex: -1,
        cursorX: 0,

        width: 0,
        height: 0,
        gutter: config.gutter || [8, 8, 8, 8],

        xDomain: [0, 1],
        yDomain: [0, 1],
        xRange: [0, 100],
        yRange: [0, 100],

        curve: config.curve || 'smooth',
        autoGutter: config.autoGutter !== false,
        gutterAdjustTimer: null,

        axisConfigs: {},

        resizeObserver: null,

        init() {
            this.$nextTick(() => {
                this.scanAxisConfigs();
                this.processData();
                this.setupResizeObserver();
                this.calculateDimensions();
            });

            this.$watch('value', () => {
                this.processData();
            });
        },

        scanAxisConfigs() {
            this.axisConfigs = {};
            this.$el.querySelectorAll('[data-spire-chart-axis]').forEach(el => {
                const key = el.dataset.spireChartAxis;
                this.axisConfigs[key] = {
                    axis: key,
                    field: el.dataset.spireAxisField || null,
                    position: el.dataset.spireAxisPosition || 'bottom',
                    tickConfig: JSON.parse(el.dataset.spireAxisTickConfig || '{}'),
                    tickPrefix: el.dataset.spireAxisTickPrefix || '',
                    tickSuffix: el.dataset.spireAxisTickSuffix || '',
                    format: JSON.parse(el.dataset.spireAxisFormat || '{}')
                };
            });
        },

        measureRenderedAxisText() {
            const measurements = {
                x: { maxHeight: 0, maxWidth: 0 },
                y: { maxHeight: 0, maxWidth: 0 }
            };

            const xAxisTicks = this.$el.querySelectorAll('[data-axis-type="x"] text[data-spire-chart-tick]');
            xAxisTicks.forEach(text => {
                try {
                    const bbox = text.getBBox();
                    measurements.x.maxHeight = Math.max(measurements.x.maxHeight, bbox.height);
                    measurements.x.maxWidth = Math.max(measurements.x.maxWidth, bbox.width);
                } catch (e) {}
            });

            const yAxisTicks = this.$el.querySelectorAll('[data-axis-type="y"] text[data-spire-chart-tick]');
            yAxisTicks.forEach(text => {
                try {
                    const bbox = text.getBBox();
                    measurements.y.maxHeight = Math.max(measurements.y.maxHeight, bbox.height);
                    measurements.y.maxWidth = Math.max(measurements.y.maxWidth, bbox.width);
                } catch (e) {}
            });

            return measurements;
        },

        adjustGutterFromRenderedText() {
            if (!this.autoGutter) return false;

            const measurements = this.measureRenderedAxisText();
            const currentGutter = this.parseGutter(this.gutter);
            let updated = false;
            const pointDimension = 8;

            const xAxisConfig = this.axisConfigs['x'];
            if (xAxisConfig && xAxisConfig.position !== 'top' && measurements.x.maxHeight > 0) {
                const requiredBottom = Math.ceil(measurements.x.maxHeight + pointDimension + 8);
                if (requiredBottom > currentGutter[2]) {
                    currentGutter[2] = requiredBottom;
                    updated = true;
                }

                const xAxisTicks = this.$el.querySelectorAll('[data-axis-type="x"] text[data-spire-chart-tick]');
                if (xAxisTicks.length > 0) {
                    const lastTick = xAxisTicks[xAxisTicks.length - 1];
                    try {
                        const bbox = lastTick.getBBox();
                        const textAnchor = lastTick.getAttribute('text-anchor') || 'middle';

                        let overhang = 0;
                        if (textAnchor === 'middle') {
                            overhang = bbox.width / 2;
                        } else if (textAnchor === 'start') {
                            overhang = bbox.width;
                        }

                        const requiredRight = Math.ceil(overhang) + 16;
                        if (requiredRight > currentGutter[1]) {
                            currentGutter[1] = requiredRight;
                            updated = true;
                        }
                    } catch (e) {}
                }
            }

            const yAxisConfig = this.axisConfigs['y'];
            if (yAxisConfig && yAxisConfig.position !== 'right' && measurements.y.maxWidth > 0) {
                const requiredLeft = Math.ceil(measurements.y.maxWidth + 16);
                if (requiredLeft > currentGutter[3]) {
                    currentGutter[3] = requiredLeft;
                    updated = true;
                }

                const requiredTop = Math.ceil(measurements.y.maxHeight / 2 + pointDimension + 4);
                if (requiredTop > currentGutter[0]) {
                    currentGutter[0] = requiredTop;
                    updated = true;
                }
            }

            if (updated) {
                this.gutter = currentGutter;
                this.calculateDimensions();
                return true;
            }

            return false;
        },

        processData() {
            const data = this.value;

            if (!data || data.length === 0) {
                this.normalizedData = [];
                this.fields = [];
                return;
            }

            if (typeof data[0] === 'number') {
                this.normalizedData = data.map((value, index) => ({
                    _index: index,
                    value: value
                }));
                this.fields = ['value'];
            } else {
                this.normalizedData = data.map((item, index) => ({
                    ...item,
                    _index: index
                }));

                if (data.length > 0) {
                    this.fields = Object.keys(data[0]).filter(k => !k.startsWith('_'));
                }
            }

            this.calculateScales();
        },

        setupResizeObserver() {
            const svg = this.$el.querySelector('[data-spire-chart-svg]');
            if (!svg) return;

            this.resizeObserver = new ResizeObserver(() => {
                this.calculateDimensions();
            });

            this.resizeObserver.observe(svg);
        },

        calculateDimensions() {
            const svg = this.$el.querySelector('[data-spire-chart-svg]');
            if (!svg) return;

            const rect = svg.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;

            const [top, right, bottom, left] = this.parseGutter(this.gutter);
            this.xRange = [left, this.width - right];
            this.yRange = [top, this.height - bottom];

            this.calculateScales();
        },

        parseGutter(gutter) {
            if (typeof gutter === 'number') {
                return [gutter, gutter, gutter, gutter];
            }
            if (typeof gutter === 'string') {
                const parts = gutter.split(/\s+/).map(Number);
                if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]];
                if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]];
                if (parts.length === 3) return [parts[0], parts[1], parts[2], parts[1]];
                return parts.slice(0, 4);
            }
            if (Array.isArray(gutter)) {
                return gutter;
            }
            return [8, 8, 8, 8];
        },

        calculateScales() {
            if (this.normalizedData.length === 0) return;

            this.xDomain = [0, this.normalizedData.length - 1];

            const xAxisField = this.axisConfigs['x']?.field || null;

            let minY = Infinity;
            let maxY = -Infinity;

            this.normalizedData.forEach(item => {
                this.fields.forEach(field => {
                    if (field === xAxisField) return;

                    const val = this.getNumericValue(item[field]);
                    if (val !== null) {
                        minY = Math.min(minY, val);
                        maxY = Math.max(maxY, val);
                    }
                });
            });

            const yPadding = (maxY - minY) * 0.05 || 1;

            const yAxisConfig = this.axisConfigs['y'];
            const yTickStart = yAxisConfig?.tickConfig?.start;

            let domainMin;
            if (yTickStart !== 'auto' && yTickStart !== undefined && yTickStart !== null) {
                domainMin = parseFloat(yTickStart);
            } else {
                domainMin = Math.min(0, minY - yPadding);
            }

            this.yDomain = [domainMin, maxY + yPadding];
        },

        getNumericValue(value) {
            if (typeof value === 'number') return value;
            if (value instanceof Date) return value.getTime();
            if (typeof value === 'string') {
                const trimmed = value.trim();
                if (/^-?\d+\.?\d*$/.test(trimmed)) {
                    return parseFloat(trimmed);
                }
                const date = new Date(value);
                if (!isNaN(date.getTime())) return date.getTime();
            }
            return null;
        },

        scaleX(value) {
            const [d0, d1] = this.xDomain;
            const [r0, r1] = this.xRange;
            if (d1 === d0) return r0;
            return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0);
        },

        scaleY(value) {
            const [d0, d1] = this.yDomain;
            const [r0, r1] = this.yRange;
            if (d1 === d0) return r1;
            return r1 - ((value - d0) / (d1 - d0)) * (r1 - r0);
        },

        generateLinePath(field, curve = null) {
            if (this.normalizedData.length === 0) return '';

            const curveType = curve || this.curve;
            const points = this.getFieldPoints(field);

            if (points.length === 0) return '';
            if (points.length === 1) {
                return `M ${points[0].x} ${points[0].y}`;
            }

            if (curveType === 'none') {
                return this.generateLinearPath(points);
            }

            return this.generateSmoothPath(points);
        },

        generateAreaPath(field, curve = null) {
            if (this.normalizedData.length === 0) return '';

            const curveType = curve || this.curve;
            const points = this.getFieldPoints(field);

            if (points.length === 0) return '';

            const baseline = this.scaleY(0);

            let path;
            if (curveType === 'none') {
                path = this.generateLinearPath(points);
            } else {
                path = this.generateSmoothPath(points);
            }

            const lastPoint = points[points.length - 1];
            const firstPoint = points[0];

            return `${path} L ${lastPoint.x} ${baseline} L ${firstPoint.x} ${baseline} Z`;
        },

        getFieldPoints(field) {
            return this.normalizedData
                .map((item, index) => {
                    const value = this.getNumericValue(item[field] ?? item.value);
                    if (value === null) return null;
                    return {
                        x: this.scaleX(index),
                        y: this.scaleY(value)
                    };
                })
                .filter(p => p !== null);
        },

        generateLinearPath(points) {
            return points
                .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
                .join(' ');
        },

        generateSmoothPath(points) {
            if (points.length < 2) {
                return points.length === 1 ? `M ${points[0].x} ${points[0].y}` : '';
            }

            let path = `M ${points[0].x} ${points[0].y}`;

            for (let i = 0; i < points.length - 1; i++) {
                const p0 = points[Math.max(0, i - 1)];
                const p1 = points[i];
                const p2 = points[i + 1];
                const p3 = points[Math.min(points.length - 1, i + 2)];

                const tension = 0.5;

                const cp1x = p1.x + (p2.x - p0.x) * tension / 3;
                const cp1y = p1.y + (p2.y - p0.y) * tension / 3;
                const cp2x = p2.x - (p3.x - p1.x) * tension / 3;
                const cp2y = p2.y - (p3.y - p1.y) * tension / 3;

                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
            }

            return path;
        },

        generateTicks(axis, config = {}) {
            const {
                count = 5,
                start = 'auto',
                end = 'auto',
                values = null
            } = config;

            if (values && Array.isArray(values)) {
                return values;
            }

            if (axis === 'x') {
                return this.generateXTicks(count);
            }

            return this.generateYTicks(count, start, end);
        },

        getAxisConfigByType(axisType) {
            return this.axisConfigs[axisType] || null;
        },

        getAxisTicksByType(axisType) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return [];
            return this.generateTicks(config.axis, config.tickConfig);
        },

        getTickXByType(axisType, tick) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return 0;
            return config.axis === 'x'
                ? this.scaleX(tick)
                : (config.position === 'right' ? this.xRange[1] : this.xRange[0]);
        },

        getTickYByType(axisType, tick) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return 0;
            return config.axis === 'x'
                ? (config.position === 'top' ? this.yRange[0] : this.yRange[1])
                : this.scaleY(tick);
        },

        getTickLabelByType(axisType, tick) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return '';

            let value = tick;
            if (config.axis === 'x' && config.field && this.normalizedData[tick]) {
                value = this.normalizedData[tick][config.field];
            }

            return config.tickPrefix + this.formatValue(value, config.format) + config.tickSuffix;
        },

        getTickAnchorByType(axisType, defaultAnchor = 'middle') {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return defaultAnchor;
            return config.axis === 'x' ? defaultAnchor : (config.position === 'right' ? 'start' : 'end');
        },

        getTickDxByType(axisType, defaultDx = '0') {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return defaultDx;
            return config.axis === 'x' ? defaultDx : (config.position === 'right' ? '8' : '-8');
        },

        getTickDyByType(axisType, defaultDy = '0') {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return defaultDy;
            return config.axis === 'x' ? '8' : defaultDy;
        },

        getGridX1ByType(axisType, tick) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return 0;
            return config.axis === 'x' ? this.scaleX(tick) : this.xRange[0];
        },

        getGridY1ByType(axisType, tick) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return 0;
            return config.axis === 'x' ? this.yRange[0] : this.scaleY(tick);
        },

        getGridX2ByType(axisType, tick) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return 0;
            return config.axis === 'x' ? this.scaleX(tick) : this.xRange[1];
        },

        getGridY2ByType(axisType, tick) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return 0;
            return config.axis === 'x' ? this.yRange[1] : this.scaleY(tick);
        },

        getAxisLineX1ByType(axisType) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return 0;
            return config.axis === 'x' ? this.xRange[0] : (config.position === 'right' ? this.xRange[1] : this.xRange[0]);
        },

        getAxisLineY1ByType(axisType) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return 0;
            return config.axis === 'x' ? (config.position === 'top' ? this.yRange[0] : this.yRange[1]) : this.yRange[0];
        },

        getAxisLineX2ByType(axisType) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return 0;
            return config.axis === 'x' ? this.xRange[1] : (config.position === 'right' ? this.xRange[1] : this.xRange[0]);
        },

        getAxisLineY2ByType(axisType) {
            const config = this.getAxisConfigByType(axisType);
            if (!config) return 0;
            return config.axis === 'x' ? (config.position === 'top' ? this.yRange[0] : this.yRange[1]) : this.yRange[1];
        },

        getAxisConfig(element) {
            const axisEl = element.closest('[data-spire-chart-axis]');
            if (!axisEl) return null;

            return {
                axis: axisEl.dataset.spireChartAxis || 'x',
                field: axisEl.dataset.spireAxisField || null,
                position: axisEl.dataset.spireAxisPosition || 'bottom',
                tickConfig: JSON.parse(axisEl.dataset.spireAxisTickConfig || '{}'),
                tickPrefix: axisEl.dataset.spireAxisTickPrefix || '',
                tickSuffix: axisEl.dataset.spireAxisTickSuffix || '',
                format: JSON.parse(axisEl.dataset.spireAxisFormat || '{}')
            };
        },

        getAxisTicks(element) {
            const config = this.getAxisConfig(element);
            if (!config) return [];
            return this.generateTicks(config.axis, config.tickConfig);
        },

        getTickX(element, tick) {
            const config = this.getAxisConfig(element);
            if (!config) return 0;
            return config.axis === 'x'
                ? this.scaleX(tick)
                : (config.position === 'right' ? this.xRange[1] : this.xRange[0]);
        },

        getTickY(element, tick) {
            const config = this.getAxisConfig(element);
            if (!config) return 0;
            return config.axis === 'x'
                ? (config.position === 'top' ? this.yRange[0] : this.yRange[1])
                : this.scaleY(tick);
        },

        getTickLabel(element, tick) {
            const config = this.getAxisConfig(element);
            if (!config) return '';

            let value = tick;
            if (config.axis === 'x' && config.field && this.normalizedData[tick]) {
                value = this.normalizedData[tick][config.field];
            }

            return config.tickPrefix + this.formatValue(value, config.format) + config.tickSuffix;
        },

        getTickAnchor(element, defaultAnchor = 'middle') {
            const config = this.getAxisConfig(element);
            if (!config) return defaultAnchor;
            return config.axis === 'x' ? defaultAnchor : (config.position === 'right' ? 'start' : 'end');
        },

        getTickDx(element, defaultDx = '0') {
            const config = this.getAxisConfig(element);
            if (!config) return defaultDx;
            return config.axis === 'x' ? defaultDx : (config.position === 'right' ? '8' : '-8');
        },

        getTickDy(element, defaultDy = '0') {
            const config = this.getAxisConfig(element);
            if (!config) return defaultDy;
            return config.axis === 'x' ? '8' : defaultDy;
        },

        getGridX1(element, tick) {
            const config = this.getAxisConfig(element);
            if (!config) return 0;
            return config.axis === 'x' ? this.scaleX(tick) : this.xRange[0];
        },

        getGridY1(element, tick) {
            const config = this.getAxisConfig(element);
            if (!config) return 0;
            return config.axis === 'x' ? this.yRange[0] : this.scaleY(tick);
        },

        getGridX2(element, tick) {
            const config = this.getAxisConfig(element);
            if (!config) return 0;
            return config.axis === 'x' ? this.scaleX(tick) : this.xRange[1];
        },

        getGridY2(element, tick) {
            const config = this.getAxisConfig(element);
            if (!config) return 0;
            return config.axis === 'x' ? this.yRange[1] : this.scaleY(tick);
        },

        getAxisLineX1(element) {
            const config = this.getAxisConfig(element);
            if (!config) return 0;
            return config.axis === 'x' ? this.xRange[0] : (config.position === 'right' ? this.xRange[1] : this.xRange[0]);
        },

        getAxisLineY1(element) {
            const config = this.getAxisConfig(element);
            if (!config) return 0;
            return config.axis === 'x' ? (config.position === 'top' ? this.yRange[0] : this.yRange[1]) : this.yRange[0];
        },

        getAxisLineX2(element) {
            const config = this.getAxisConfig(element);
            if (!config) return 0;
            return config.axis === 'x' ? this.xRange[1] : (config.position === 'right' ? this.xRange[1] : this.xRange[0]);
        },

        getAxisLineY2(element) {
            const config = this.getAxisConfig(element);
            if (!config) return 0;
            return config.axis === 'x' ? (config.position === 'top' ? this.yRange[0] : this.yRange[1]) : this.yRange[1];
        },

        generateXTicks(count) {
            if (this.normalizedData.length === 0) return [];

            const len = this.normalizedData.length;
            if (len <= count) {
                return this.normalizedData.map((_, i) => i);
            }

            const ticks = [];
            const step = (len - 1) / (count - 1);
            for (let i = 0; i < count; i++) {
                ticks.push(Math.round(i * step));
            }
            return ticks;
        },

        generateYTicks(count, start, end) {
            let [min, max] = this.yDomain;

            if (start === 0 || start === '0') min = 0;
            else if (start !== 'auto' && start !== 'min' && !isNaN(start)) min = Number(start);

            if (end !== 'auto' && end !== 'max' && !isNaN(end)) max = Number(end);

            const range = max - min;
            const roughStep = range / (count - 1);
            const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
            const normalized = roughStep / magnitude;

            let niceStep;
            if (normalized <= 1) niceStep = magnitude;
            else if (normalized <= 2) niceStep = 2 * magnitude;
            else if (normalized <= 5) niceStep = 5 * magnitude;
            else niceStep = 10 * magnitude;

            const niceMin = Math.floor(min / niceStep) * niceStep;
            const niceMax = Math.ceil(max / niceStep) * niceStep;

            const ticks = [];
            for (let v = niceMin; v <= niceMax; v += niceStep) {
                ticks.push(Math.round(v * 1e10) / 1e10);
            }

            return ticks;
        },

        getValueAtIndex(index, field) {
            if (index < 0 || index >= this.normalizedData.length) return null;
            const item = this.normalizedData[index];
            return item[field] ?? item.value ?? null;
        },

        getCurrentValue(field, fallback = null) {
            const index = this.hoveredIndex >= 0
                ? this.hoveredIndex
                : this.normalizedData.length - 1;
            return this.getValueAtIndex(index, field) ?? fallback;
        },

        formatValue(value, format = {}) {
            if (value === null || value === undefined) return '';

            const date = this.parseDate(value);
            if (date) {
                return this.formatDate(date, format);
            }

            return this.formatNumber(value, format);
        },

        formatNumber(value, format = {}) {
            try {
                const formatter = new Intl.NumberFormat(undefined, format);
                return formatter.format(value);
            } catch (e) {
                return String(value);
            }
        },

        formatDate(date, format = {}) {
            try {
                const formatter = new Intl.DateTimeFormat(undefined, format);
                return formatter.format(date);
            } catch (e) {
                return String(date);
            }
        },

        parseDate(value) {
            if (value instanceof Date) return value;
            if (typeof value === 'string') {
                const date = new Date(value);
                if (!isNaN(date.getTime())) return date;
            }
            return null;
        },

        handleMouseMove(event) {
            const svg = event.currentTarget;
            if (!svg) return;

            const rect = svg.getBoundingClientRect();
            const x = event.clientX - rect.left;

            this.cursorX = x;
            this.hoveredIndex = this.findNearestIndex(x);
        },

        handleMouseLeave() {
            this.hoveredIndex = -1;
        },

        findNearestIndex(x) {
            if (this.normalizedData.length === 0) return -1;

            let minDist = Infinity;
            let nearestIndex = -1;

            this.normalizedData.forEach((_, index) => {
                const dataX = this.scaleX(index);
                const dist = Math.abs(x - dataX);
                if (dist < minDist) {
                    minDist = dist;
                    nearestIndex = index;
                }
            });

            return nearestIndex;
        },

        getCursorX() {
            if (this.hoveredIndex < 0) return 0;
            return this.scaleX(this.hoveredIndex);
        },

        getPointY(index, field) {
            const value = this.getNumericValue(this.getValueAtIndex(index, field));
            if (value === null) return 0;
            return this.scaleY(value);
        },

        getPoints(field) {
            return this.normalizedData.map((item, index) => ({
                x: this.scaleX(index),
                y: this.scaleY(this.getNumericValue(item[field] ?? item.value) || 0),
                index
            }));
        },

        renderPoints(container, field) {
            const SVG_NS = 'http://www.w3.org/2000/svg';
            const points = this.getPoints(field);

            const r = container.dataset.spirePointR || '4';
            const strokeWidth = container.dataset.spirePointStrokeWidth || '2';
            const pointClass = container.dataset.spirePointClass || '';

            container.innerHTML = '';

            points.forEach((point, index) => {
                const circle = document.createElementNS(SVG_NS, 'circle');
                circle.setAttribute('cx', point.x);
                circle.setAttribute('cy', point.y);
                circle.setAttribute('r', r);
                circle.setAttribute('stroke-width', strokeWidth);
                circle.setAttribute('fill', 'var(--color-surface, white)');
                circle.setAttribute('stroke', 'currentColor');
                circle.setAttribute('data-spire-chart-point', '');
                circle.setAttribute('data-spire-index', index);
                if (pointClass) {
                    circle.setAttribute('class', pointClass);
                }
                container.appendChild(circle);
            });
        },

        renderTicks(container, axisType) {
            const SVG_NS = 'http://www.w3.org/2000/svg';
            const ticks = this.getAxisTicksByType(axisType);

            const tickClass = container.dataset.spireTickClass || '';
            const defaultDy = container.dataset.spireTickDy || '0';
            const defaultDx = container.dataset.spireTickDx || '0';
            const defaultAnchor = container.dataset.spireTickAnchor || 'middle';

            container.innerHTML = '';

            ticks.forEach((tick, index) => {
                const text = document.createElementNS(SVG_NS, 'text');
                text.setAttribute('x', this.getTickXByType(axisType, tick));
                text.setAttribute('y', this.getTickYByType(axisType, tick));

                let textAnchor;
                if (axisType === 'x') {
                    if (index === 0) {
                        textAnchor = 'start';
                    } else if (index === ticks.length - 1) {
                        textAnchor = 'end';
                    } else {
                        textAnchor = 'middle';
                    }
                } else {
                    textAnchor = this.getTickAnchorByType(axisType, defaultAnchor);
                }

                text.setAttribute('text-anchor', textAnchor);
                text.setAttribute('dominant-baseline', axisType === 'x' ? 'hanging' : 'middle');
                text.setAttribute('dx', this.getTickDxByType(axisType, defaultDx));
                text.setAttribute('dy', this.getTickDyByType(axisType, defaultDy));
                text.setAttribute('fill', 'currentColor');
                text.setAttribute('data-spire-chart-tick', '');
                text.textContent = this.getTickLabelByType(axisType, tick);
                if (tickClass) {
                    text.setAttribute('class', tickClass);
                }
                container.appendChild(text);
            });

            if (this.autoGutter) {
                if (this.gutterAdjustTimer) {
                    clearTimeout(this.gutterAdjustTimer);
                }
                this.gutterAdjustTimer = setTimeout(() => {
                    this.$nextTick(() => {
                        this.adjustGutterFromRenderedText();
                    });
                }, 50);
            }
        },

        renderGridLines(container, axisType) {
            const SVG_NS = 'http://www.w3.org/2000/svg';
            const ticks = this.getAxisTicksByType(axisType);

            const gridClass = container.dataset.spireGridClass || '';

            container.innerHTML = '';

            ticks.forEach((tick) => {
                const line = document.createElementNS(SVG_NS, 'line');
                line.setAttribute('x1', this.getGridX1ByType(axisType, tick));
                line.setAttribute('y1', this.getGridY1ByType(axisType, tick));
                line.setAttribute('x2', this.getGridX2ByType(axisType, tick));
                line.setAttribute('y2', this.getGridY2ByType(axisType, tick));
                line.setAttribute('stroke', 'currentColor');
                line.setAttribute('data-spire-chart-grid-line', '');
                if (gridClass) {
                    line.setAttribute('class', gridClass);
                }
                container.appendChild(line);
            });
        },

        hasNegativeValues() {
            return this.yDomain[0] < 0;
        },

        getZeroY() {
            return this.scaleY(0);
        },

        setGutter(gutter) {
            this.gutter = this.parseGutter(gutter);
            this.calculateDimensions();
        },

        destroy() {
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
                this.resizeObserver = null;
            }
            if (this.gutterAdjustTimer) {
                clearTimeout(this.gutterAdjustTimer);
                this.gutterAdjustTimer = null;
            }
        }
    };
}
