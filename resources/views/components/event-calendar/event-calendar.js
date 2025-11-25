import { CalendarUtils } from '../calendar/calendar-utils';
import { DateFormatter } from '../calendar/date-formatter';

/**
 * Event Calendar Alpine component
 * Supports month, week, and day views with accessibility and multi-day events
 */
export function eventCalendarComponent(config = {}) {
    const today = new Date();

    return {
        events: config.events ?? [],
        view: config.view ?? 'month',
        currentDate: config.date ? new Date(config.date) : today,
        locale: config.locale ?? null,
        firstDayOfWeek: config.firstDayOfWeek ?? 0,
        maxEventsPerDay: config.maxEventsPerDay ?? 3,
        weekends: config.weekends ?? true,
        startHour: config.startHour ?? 6,
        endHour: config.endHour ?? 22,
        showViewSwitcher: config.showViewSwitcher ?? true,
        mobileBreakpoint: config.mobileBreakpoint ?? 640,

        isMobile: false,
        displayMonth: null,
        displayYear: null,
        weeks: [],
        dayNames: [],
        monthName: '',

        focusedDate: null,
        announcement: '',
        weekEventLayouts: [],
        morePopoverTrigger: null,

        weekDays: [],
        weekStart: null,
        weekEnd: null,
        currentDayDate: null,
        timeSlots: [],
        allDayEvents: [],
        timedEvents: [],

        morePopover: {
            open: false,
            date: null,
            events: [],
            x: 0,
            y: 0,
        },

        init() {
            this.displayMonth = this.currentDate.getMonth();
            this.displayYear = this.currentDate.getFullYear();
            this.focusedDate = this.getInitialFocusDate();

            this.checkMobile();
            window.addEventListener('resize', () => this.handleResize());

            if (this.isMobile && this.view !== 'day') {
                this.view = 'day';
            }

            this.updateCalendar();

            this.$watch('events', () => {
                this.updateCalendar();
            });

            this.$watch('view', () => {
                this.updateCalendar();
                this.dispatchViewChange();
            });
        },

        checkMobile() {
            this.isMobile = window.innerWidth < this.mobileBreakpoint;
        },

        handleResize() {
            const wasMobile = this.isMobile;
            this.checkMobile();

            if (this.isMobile && !wasMobile && this.view !== 'day') {
                this.view = 'day';
            }
        },

        getLocale() {
            return this.locale || navigator.language || 'en-US';
        },

        getInitialFocusDate() {
            const todayStr = CalendarUtils.today();
            const todayDate = new Date(todayStr);
            if (todayDate.getMonth() === this.displayMonth &&
                todayDate.getFullYear() === this.displayYear) {
                return todayStr;
            }
            return CalendarUtils.formatDate(this.displayYear, this.displayMonth, 1);
        },

        updateCalendar() {
            this.generateTimeSlots();

            if (this.view === 'month') {
                this.weeks = this.generateMonthGrid();
                this.weekEventLayouts = this.calculateWeekEventLayouts();
            } else if (this.view === 'week') {
                this.generateWeekGrid();
            } else if (this.view === 'day') {
                this.generateDayData();
            }

            this.dayNames = CalendarUtils.getDayNames(
                this.firstDayOfWeek,
                this.getLocale(),
                'short'
            );
            this.monthName = DateFormatter.getMonthName(
                this.displayMonth,
                'long',
                this.getLocale()
            );
        },

        generateMonthGrid() {
            const weeks = [];
            const firstDay = new Date(this.displayYear, this.displayMonth, 1);
            const lastDay = new Date(this.displayYear, this.displayMonth + 1, 0);

            let dayOfWeek = firstDay.getDay();
            let diff = dayOfWeek - this.firstDayOfWeek;
            if (diff < 0) diff += 7;

            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - diff);

            const current = new Date(startDate);
            const todayString = CalendarUtils.today();

            for (let week = 0; week < 6; week++) {
                const weekDays = [];

                for (let day = 0; day < 7; day++) {
                    const dateString = CalendarUtils.formatDate(
                        current.getFullYear(),
                        current.getMonth(),
                        current.getDate()
                    );

                    const dayOfWeekNum = current.getDay();
                    const isWeekend = dayOfWeekNum === 0 || dayOfWeekNum === 6;

                    if (!this.weekends && isWeekend) {
                        current.setDate(current.getDate() + 1);
                        continue;
                    }

                    weekDays.push({
                        date: dateString,
                        day: current.getDate(),
                        isCurrentMonth: current.getMonth() === this.displayMonth,
                        isToday: dateString === todayString,
                        isWeekend,
                        events: this.getEventsForDate(dateString),
                    });

                    current.setDate(current.getDate() + 1);
                }

                if (weekDays.length > 0) {
                    weeks.push(weekDays);
                }

                if (current.getMonth() !== this.displayMonth && current > lastDay) {
                    break;
                }
            }

            return weeks;
        },

        generateTimeSlots() {
            const slots = [];
            for (let hour = this.startHour; hour < this.endHour; hour++) {
                slots.push({
                    hour,
                    minute: 0,
                    label: this.formatHourLabel(hour),
                    key: `${hour}:00`,
                });
            }
            this.timeSlots = slots;
        },

        formatHourLabel(hour) {
            const date = new Date();
            date.setHours(hour, 0, 0);
            return new Intl.DateTimeFormat(this.getLocale(), {
                hour: 'numeric',
                hour12: true,
            }).format(date);
        },

        generateWeekGrid() {
            const dateString = CalendarUtils.formatDate(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth(),
                this.currentDate.getDate()
            );

            const dayOfWeek = this.currentDate.getDay();
            let diff = dayOfWeek - this.firstDayOfWeek;
            if (diff < 0) diff += 7;

            const weekStartDate = new Date(this.currentDate);
            weekStartDate.setDate(weekStartDate.getDate() - diff);

            const weekEndDate = new Date(weekStartDate);
            weekEndDate.setDate(weekEndDate.getDate() + 6);

            this.weekStart = CalendarUtils.formatDate(
                weekStartDate.getFullYear(),
                weekStartDate.getMonth(),
                weekStartDate.getDate()
            );
            this.weekEnd = CalendarUtils.formatDate(
                weekEndDate.getFullYear(),
                weekEndDate.getMonth(),
                weekEndDate.getDate()
            );

            const days = [];
            const current = new Date(weekStartDate);
            const todayString = CalendarUtils.today();

            for (let i = 0; i < 7; i++) {
                const currentDateString = CalendarUtils.formatDate(
                    current.getFullYear(),
                    current.getMonth(),
                    current.getDate()
                );

                const isWeekend = current.getDay() === 0 || current.getDay() === 6;

                if (!this.weekends && isWeekend) {
                    current.setDate(current.getDate() + 1);
                    continue;
                }

                days.push({
                    date: currentDateString,
                    day: current.getDate(),
                    dayName: this.getDayName(current.getDay()),
                    isToday: currentDateString === todayString,
                    isWeekend,
                });

                current.setDate(current.getDate() + 1);
            }

            this.weekDays = days;
            this.categorizeEventsForTimeGrid(this.weekStart, this.weekEnd);
        },

        getDayName(dayOfWeek) {
            const date = new Date();
            date.setDate(date.getDate() - date.getDay() + dayOfWeek);
            return new Intl.DateTimeFormat(this.getLocale(), { weekday: 'short' }).format(date);
        },

        generateDayData() {
            this.currentDayDate = CalendarUtils.formatDate(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth(),
                this.currentDate.getDate()
            );
            this.categorizeEventsForTimeGrid(this.currentDayDate, this.currentDayDate);
        },

        categorizeEventsForTimeGrid(startDate, endDate) {
            const rangeEvents = this.events.filter(event => {
                const eventStart = this.getDatePart(event.start);
                const eventEnd = event.end ? this.getDatePart(event.end) : eventStart;
                return eventStart <= endDate && eventEnd >= startDate;
            });

            this.allDayEvents = rangeEvents.filter(e => e.allDay);
            this.timedEvents = rangeEvents.filter(e => !e.allDay);
        },

        getEventsForDate(dateString) {
            return this.events.filter(event => {
                const eventStart = this.getDatePart(event.start);
                const eventEnd = event.end ? this.getDatePart(event.end) : eventStart;

                return dateString >= eventStart && dateString <= eventEnd;
            }).sort((a, b) => {
                if (a.allDay && !b.allDay) return -1;
                if (!a.allDay && b.allDay) return 1;
                return new Date(a.start) - new Date(b.start);
            });
        },

        getSingleDayEvents(day) {
            return day.events.filter(event => !this.isMultiDayEvent(event));
        },

        getVisibleSingleDayEvents(day) {
            return this.getSingleDayEvents(day).slice(0, this.maxEventsPerDay);
        },

        getHiddenSingleDayEventsCount(day) {
            return Math.max(0, this.getSingleDayEvents(day).length - this.maxEventsPerDay);
        },

        getVisibleEvents(day) {
            return day.events.slice(0, this.maxEventsPerDay);
        },

        getHiddenEventsCount(day) {
            return Math.max(0, day.events.length - this.maxEventsPerDay);
        },

        getDatePart(dateTimeString) {
            if (!dateTimeString) return null;
            return dateTimeString.split(' ')[0].split('T')[0];
        },

        getTimePart(dateTimeString) {
            if (!dateTimeString) return null;
            const parts = dateTimeString.split(' ');
            if (parts.length > 1) return parts[1];
            const tParts = dateTimeString.split('T');
            if (tParts.length > 1) return tParts[1].substring(0, 5);
            return null;
        },

        formatEventTime(event) {
            if (event.allDay) return '';
            const time = this.getTimePart(event.start);
            if (!time) return '';

            try {
                const [hours, minutes] = time.split(':');
                const date = new Date();
                date.setHours(parseInt(hours, 10), parseInt(minutes, 10));

                return new Intl.DateTimeFormat(this.getLocale(), {
                    hour: 'numeric',
                    minute: '2-digit',
                }).format(date);
            } catch {
                return time;
            }
        },

        formatEventTimeRange(event) {
            if (event.allDay) return '';

            const formatTime = (timeString) => {
                if (!timeString) return null;
                const time = this.getTimePart(timeString);
                if (!time) return null;

                try {
                    const [hours, minutes] = time.split(':');
                    const date = new Date();
                    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));

                    return new Intl.DateTimeFormat(this.getLocale(), {
                        hour: 'numeric',
                        minute: '2-digit',
                    }).format(date);
                } catch {
                    return time;
                }
            };

            const startTime = formatTime(event.start);
            const endTime = formatTime(event.end);

            if (startTime && endTime) {
                return `${startTime} - ${endTime}`;
            }

            return startTime || '';
        },

        getEventColor(event) {
            const colors = {
                blue: 'var(--color-primary)',
                red: 'var(--color-danger)',
                green: 'var(--color-success)',
                yellow: 'var(--color-warning)',
                purple: '#8b5cf6',
                pink: '#ec4899',
                orange: '#f97316',
                teal: '#14b8a6',
            };

            if (event.color?.startsWith('#') || event.color?.startsWith('rgb')) {
                return event.color;
            }

            return colors[event.color] || colors.blue;
        },

        // ==================== Multi-Day Event Slot Assignment ====================

        getEventDurationInDays(event) {
            const eventStart = this.getDatePart(event.start);
            const eventEnd = event.end ? this.getDatePart(event.end) : eventStart;
            const start = new Date(eventStart);
            const end = new Date(eventEnd);
            return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        },

        getEventsForWeek(weekStart, weekEnd) {
            return this.events.filter(event => {
                const eventStart = this.getDatePart(event.start);
                const eventEnd = event.end ? this.getDatePart(event.end) : eventStart;
                return eventStart <= weekEnd && eventEnd >= weekStart;
            });
        },

        findAvailableSlot(slotOccupancy, startCol, endCol) {
            let slot = 0;
            while (true) {
                const occupied = slotOccupancy[slot] || [];
                const hasConflict = occupied.some(([occStart, occEnd]) =>
                    !(endCol < occStart || startCol > occEnd)
                );
                if (!hasConflict) return slot;
                slot++;
                if (slot > 10) break;
            }
            return slot;
        },

        assignEventSlots(events, week) {
            const assignments = {};
            const slotOccupancy = {};

            const multiDayEvents = events.filter(e => this.isMultiDayEvent(e));
            const sortedEvents = [...multiDayEvents].sort((a, b) => {
                const aDays = this.getEventDurationInDays(a);
                const bDays = this.getEventDurationInDays(b);
                if (aDays !== bDays) return bDays - aDays;
                return new Date(a.start) - new Date(b.start);
            });

            const weekDates = week.map(d => d.date);

            for (const event of sortedEvents) {
                const eventStart = this.getDatePart(event.start);
                const eventEnd = event.end ? this.getDatePart(event.end) : eventStart;

                let startCol = eventStart < weekDates[0] ? 0 : weekDates.indexOf(eventStart);
                let endCol = eventEnd > weekDates[weekDates.length - 1]
                    ? weekDates.length - 1
                    : weekDates.indexOf(eventEnd);

                if (startCol === -1) startCol = 0;
                if (endCol === -1) endCol = weekDates.length - 1;

                const slot = this.findAvailableSlot(slotOccupancy, startCol, endCol);

                if (!slotOccupancy[slot]) slotOccupancy[slot] = [];
                slotOccupancy[slot].push([startCol, endCol]);

                assignments[event.id] = {
                    slot,
                    startCol,
                    endCol,
                    spanDays: endCol - startCol + 1,
                    isStart: eventStart >= weekDates[0],
                    isEnd: eventEnd <= weekDates[weekDates.length - 1],
                };
            }

            return { assignments, maxSlots: Object.keys(slotOccupancy).length };
        },

        calculateWeekEventLayouts() {
            const layouts = [];

            for (let weekIndex = 0; weekIndex < this.weeks.length; weekIndex++) {
                const week = this.weeks[weekIndex];
                if (week.length === 0) continue;

                const weekStart = week[0].date;
                const weekEnd = week[week.length - 1].date;
                const weekEvents = this.getEventsForWeek(weekStart, weekEnd);
                const { assignments, maxSlots } = this.assignEventSlots(weekEvents, week);

                layouts.push({
                    weekIndex,
                    weekStart,
                    weekEnd,
                    slots: assignments,
                    maxSlots,
                });
            }

            return layouts;
        },

        getSpanningEventsForWeek(weekIndex) {
            if (!this.weeks || !this.weeks[weekIndex]) return [];

            const week = this.weeks[weekIndex];
            const weekStart = week[0].date;
            const weekEnd = week[week.length - 1].date;

            return this.events.filter(event => {
                if (!this.isMultiDayEvent(event)) return false;
                const eventStart = this.getDatePart(event.start);
                const eventEnd = event.end ? this.getDatePart(event.end) : eventStart;
                return eventStart <= weekEnd && eventEnd >= weekStart;
            });
        },

        getEventLayout(event, weekIndex) {
            if (!this.weekEventLayouts || !this.weekEventLayouts[weekIndex]) {
                return { slot: 0, startCol: 0, endCol: 0, spanDays: 1, isStart: true, isEnd: true };
            }
            return this.weekEventLayouts[weekIndex].slots[event.id] ||
                { slot: 0, startCol: 0, endCol: 0, spanDays: 1, isStart: true, isEnd: true };
        },

        getSpanningEventStyle(event, weekIndex) {
            const layout = this.getEventLayout(event, weekIndex);
            const daysInWeek = this.weeks[weekIndex]?.length || 7;

            const leftPercent = (layout.startCol / daysInWeek) * 100;
            const widthPercent = (layout.spanDays / daysInWeek) * 100;
            const slotHeight = 22;
            const topOffset = layout.slot * slotHeight;

            return {
                '--event-color': this.getEventColor(event),
                'left': `calc(${leftPercent}% + 4px)`,
                'width': `calc(${widthPercent}% - 8px)`,
                'top': `${topOffset + 32}px`,
            };
        },

        getSpanningSlotsCount(weekIndex) {
            if (!this.weekEventLayouts || !this.weekEventLayouts[weekIndex]) return 0;
            return this.weekEventLayouts[weekIndex].maxSlots;
        },

        // ==================== Time Grid Event Positioning ====================

        getEventPosition(event) {
            const startTime = this.getTimePart(event.start);
            const endTime = event.end ? this.getTimePart(event.end) : null;

            if (!startTime) return null;

            const [startHour, startMinute] = startTime.split(':').map(Number);
            const startMinutes = startHour * 60 + startMinute;

            let endMinutes;
            if (endTime) {
                const [endHour, endMinute] = endTime.split(':').map(Number);
                endMinutes = endHour * 60 + endMinute;
            } else {
                endMinutes = startMinutes + 60;
            }

            const gridStartMinutes = this.startHour * 60;
            const gridEndMinutes = this.endHour * 60;
            const totalGridMinutes = gridEndMinutes - gridStartMinutes;

            const topPercent = ((startMinutes - gridStartMinutes) / totalGridMinutes) * 100;
            const heightPercent = ((endMinutes - startMinutes) / totalGridMinutes) * 100;

            return {
                top: Math.max(0, topPercent),
                height: Math.min(100 - Math.max(0, topPercent), heightPercent),
                startMinutes,
                endMinutes,
            };
        },

        eventsOverlap(pos1, pos2) {
            return pos1.startMinutes < pos2.endMinutes && pos2.startMinutes < pos1.endMinutes;
        },

        getEventsWithColumns(events, dateString) {
            const dayEvents = events.filter(event => {
                const eventDate = this.getDatePart(event.start);
                return eventDate === dateString;
            });

            const positioned = dayEvents
                .map(event => ({ event, position: this.getEventPosition(event) }))
                .filter(e => e.position !== null)
                .sort((a, b) => a.position.startMinutes - b.position.startMinutes);

            const columns = [];

            positioned.forEach(item => {
                let column = 0;
                while (columns[column]?.some(existing =>
                    this.eventsOverlap(existing.position, item.position)
                )) {
                    column++;
                }

                if (!columns[column]) columns[column] = [];
                columns[column].push(item);
                item.column = column;
            });

            const totalColumns = columns.length || 1;

            return positioned.map(item => ({
                ...item,
                columnWidth: 100 / totalColumns,
                columnLeft: (item.column / totalColumns) * 100,
                totalColumns,
            }));
        },

        getCurrentTimePosition() {
            const now = new Date();
            const minutes = now.getHours() * 60 + now.getMinutes();
            const gridStart = this.startHour * 60;
            const gridEnd = this.endHour * 60;
            return ((minutes - gridStart) / (gridEnd - gridStart)) * 100;
        },

        isWithinTimeRange() {
            const now = new Date();
            const currentHour = now.getHours();
            return currentHour >= this.startHour && currentHour < this.endHour;
        },

        getAllDayEventsForDate(dateString) {
            return this.allDayEvents.filter(event => {
                const eventStart = this.getDatePart(event.start);
                const eventEnd = event.end ? this.getDatePart(event.end) : eventStart;
                return dateString >= eventStart && dateString <= eventEnd;
            });
        },

        // ==================== Navigation ====================

        setView(newView) {
            this.view = newView;
        },

        previousPeriod() {
            if (this.view === 'month') {
                this.previousMonth();
            } else if (this.view === 'week') {
                this.previousWeek();
            } else if (this.view === 'day') {
                this.previousDay();
            }
        },

        nextPeriod() {
            if (this.view === 'month') {
                this.nextMonth();
            } else if (this.view === 'week') {
                this.nextWeek();
            } else if (this.view === 'day') {
                this.nextDay();
            }
        },

        previousMonth() {
            this.displayMonth--;
            if (this.displayMonth < 0) {
                this.displayMonth = 11;
                this.displayYear--;
            }
            this.updateCalendar();
            this.updateFocusedDateForMonthChange();
            this.announcement = `${this.monthName} ${this.displayYear}`;
            this.dispatchViewChange();
        },

        nextMonth() {
            this.displayMonth++;
            if (this.displayMonth > 11) {
                this.displayMonth = 0;
                this.displayYear++;
            }
            this.updateCalendar();
            this.updateFocusedDateForMonthChange();
            this.announcement = `${this.monthName} ${this.displayYear}`;
            this.dispatchViewChange();
        },

        previousWeek() {
            this.currentDate.setDate(this.currentDate.getDate() - 7);
            this.displayMonth = this.currentDate.getMonth();
            this.displayYear = this.currentDate.getFullYear();
            this.updateCalendar();
            this.dispatchViewChange();
        },

        nextWeek() {
            this.currentDate.setDate(this.currentDate.getDate() + 7);
            this.displayMonth = this.currentDate.getMonth();
            this.displayYear = this.currentDate.getFullYear();
            this.updateCalendar();
            this.dispatchViewChange();
        },

        previousDay() {
            this.currentDate.setDate(this.currentDate.getDate() - 1);
            this.displayMonth = this.currentDate.getMonth();
            this.displayYear = this.currentDate.getFullYear();
            this.updateCalendar();
            this.dispatchViewChange();
        },

        nextDay() {
            this.currentDate.setDate(this.currentDate.getDate() + 1);
            this.displayMonth = this.currentDate.getMonth();
            this.displayYear = this.currentDate.getFullYear();
            this.updateCalendar();
            this.dispatchViewChange();
        },

        goToToday() {
            const today = new Date();
            this.displayMonth = today.getMonth();
            this.displayYear = today.getFullYear();
            this.currentDate = today;
            this.focusedDate = CalendarUtils.today();
            this.updateCalendar();
            this.dispatchViewChange();
        },

        dispatchViewChange() {
            let start, end;

            if (this.view === 'month') {
                const firstDay = new Date(this.displayYear, this.displayMonth, 1);
                const lastDay = new Date(this.displayYear, this.displayMonth + 1, 0);
                start = CalendarUtils.formatDate(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate());
                end = CalendarUtils.formatDate(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate());
            } else if (this.view === 'week') {
                start = this.weekStart;
                end = this.weekEnd;
            } else if (this.view === 'day') {
                start = this.currentDayDate;
                end = this.currentDayDate;
            }

            this.$dispatch('view-change', { view: this.view, start, end });
        },

        // ==================== Accessibility: Keyboard Navigation ====================

        handleDayKeydown(event, day, weekIndex) {
            const key = event.key;
            let handled = true;

            switch (key) {
                case 'ArrowRight':
                    this.moveFocusBy(1);
                    break;
                case 'ArrowLeft':
                    this.moveFocusBy(-1);
                    break;
                case 'ArrowDown':
                    this.moveFocusBy(7);
                    break;
                case 'ArrowUp':
                    this.moveFocusBy(-7);
                    break;
                case 'Home':
                    event.ctrlKey ? this.focusFirstDayOfYear() : this.focusFirstDayOfWeek();
                    break;
                case 'End':
                    event.ctrlKey ? this.focusLastDayOfYear() : this.focusLastDayOfWeek();
                    break;
                case 'PageUp':
                    this.moveFocusByMonths(event.shiftKey ? -12 : -1);
                    break;
                case 'PageDown':
                    this.moveFocusByMonths(event.shiftKey ? 12 : 1);
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    this.handleDateClick(day, event);
                    break;
                default:
                    handled = false;
            }

            if (handled) event.preventDefault();
        },

        moveFocusBy(days) {
            const currentDate = new Date(this.focusedDate);
            currentDate.setDate(currentDate.getDate() + days);

            const newDateString = CalendarUtils.formatDate(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
            );

            if (currentDate.getMonth() !== this.displayMonth ||
                currentDate.getFullYear() !== this.displayYear) {
                this.displayMonth = currentDate.getMonth();
                this.displayYear = currentDate.getFullYear();
                this.updateCalendar();
                this.dispatchViewChange();
            }

            this.setFocusedDate(newDateString);
        },

        moveFocusByMonths(months) {
            const currentDate = new Date(this.focusedDate);
            const originalDay = currentDate.getDate();
            currentDate.setMonth(currentDate.getMonth() + months);

            if (currentDate.getDate() !== originalDay) {
                currentDate.setDate(0);
            }

            this.displayMonth = currentDate.getMonth();
            this.displayYear = currentDate.getFullYear();
            this.updateCalendar();
            this.dispatchViewChange();

            this.setFocusedDate(CalendarUtils.formatDate(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
            ));
        },

        setFocusedDate(dateString) {
            this.focusedDate = dateString;

            this.$nextTick(() => {
                const dayButton = this.$el.querySelector(`button[data-date="${dateString}"]`);
                if (dayButton) dayButton.focus();
            });

            this.announceDate(dateString);
        },

        updateFocusedDateForMonthChange() {
            if (!this.focusedDate) {
                this.focusedDate = this.getInitialFocusDate();
                return;
            }

            const oldDate = new Date(this.focusedDate);
            const dayOfMonth = oldDate.getDate();
            const lastDay = new Date(this.displayYear, this.displayMonth + 1, 0).getDate();
            const newDay = Math.min(dayOfMonth, lastDay);

            this.focusedDate = CalendarUtils.formatDate(this.displayYear, this.displayMonth, newDay);
        },

        focusFirstDayOfWeek() {
            const currentDate = new Date(this.focusedDate);
            const dayOfWeek = currentDate.getDay();
            const diff = (dayOfWeek - this.firstDayOfWeek + 7) % 7;
            currentDate.setDate(currentDate.getDate() - diff);
            this.setFocusedDate(CalendarUtils.formatDate(
                currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()
            ));
        },

        focusLastDayOfWeek() {
            const currentDate = new Date(this.focusedDate);
            const dayOfWeek = currentDate.getDay();
            const daysToEnd = (this.firstDayOfWeek + 6 - dayOfWeek + 7) % 7;
            currentDate.setDate(currentDate.getDate() + daysToEnd);
            this.setFocusedDate(CalendarUtils.formatDate(
                currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()
            ));
        },

        focusFirstDayOfYear() {
            const year = new Date(this.focusedDate).getFullYear();
            this.displayMonth = 0;
            this.displayYear = year;
            this.updateCalendar();
            this.dispatchViewChange();
            this.setFocusedDate(CalendarUtils.formatDate(year, 0, 1));
        },

        focusLastDayOfYear() {
            const year = new Date(this.focusedDate).getFullYear();
            this.displayMonth = 11;
            this.displayYear = year;
            this.updateCalendar();
            this.dispatchViewChange();
            this.setFocusedDate(CalendarUtils.formatDate(year, 11, 31));
        },

        // ==================== Accessibility: ARIA Labels & Announcements ====================

        getDayAriaLabel(day) {
            const date = new Date(day.date);
            const formatter = new Intl.DateTimeFormat(this.getLocale(), {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            let label = formatter.format(date);
            if (day.isToday) label += ', today';

            const eventCount = day.events?.length || 0;
            if (eventCount > 0) {
                label += `, ${eventCount} ${eventCount === 1 ? 'event' : 'events'}`;
            }

            return label;
        },

        getEventAriaLabel(event) {
            let label = event.title;

            if (event.allDay) {
                label += ', all day event';
            } else {
                const time = this.formatEventTimeRange(event);
                if (time) label += `, ${time}`;
            }

            if (event.location) label += `, at ${event.location}`;

            return label;
        },

        announceDate(dateString) {
            const day = this.findDayInGrid(dateString);
            if (!day) return;
            this.announcement = this.getDayAriaLabel(day);
        },

        findDayInGrid(dateString) {
            for (const week of this.weeks) {
                const day = week.find(d => d.date === dateString);
                if (day) return day;
            }
            return null;
        },

        // ==================== Title Formatters ====================

        getWeekTitle() {
            if (!this.weekStart || !this.weekEnd) return '';

            const start = new Date(this.weekStart);
            const end = new Date(this.weekEnd);

            const startFormat = new Intl.DateTimeFormat(this.getLocale(), {
                month: 'short',
                day: 'numeric',
            }).format(start);

            const endFormat = new Intl.DateTimeFormat(this.getLocale(), {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }).format(end);

            return `${startFormat} - ${endFormat}`;
        },

        getDayTitle() {
            if (!this.currentDayDate) return '';
            const date = new Date(this.currentDayDate);
            return new Intl.DateTimeFormat(this.getLocale(), {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(date);
        },

        // ==================== Click Handlers ====================

        handleDateClick(day, jsEvent) {
            this.$dispatch('date-click', {
                date: day.date,
                allDay: true,
                jsEvent,
            });
        },

        handleTimeSlotClick(dateString, hour, jsEvent) {
            this.$dispatch('date-click', {
                date: dateString,
                time: `${String(hour).padStart(2, '0')}:00`,
                allDay: false,
                jsEvent,
            });
        },

        handleEventClick(event, jsEvent) {
            jsEvent.stopPropagation();
            this.$dispatch('event-click', {
                event,
                jsEvent,
            });
        },

        showMorePopover(day, jsEvent) {
            jsEvent.stopPropagation();
            this.morePopoverTrigger = jsEvent.target;

            const rect = jsEvent.target.getBoundingClientRect();
            const containerRect = this.$el.getBoundingClientRect();

            this.morePopover = {
                open: true,
                date: day.date,
                events: day.events,
                x: rect.left - containerRect.left,
                y: rect.bottom - containerRect.top + 4,
            };

            this.$nextTick(() => {
                const firstEvent = this.$refs.morePopover?.querySelector('button');
                if (firstEvent) firstEvent.focus();
            });
        },

        hideMorePopover() {
            this.morePopover.open = false;

            this.$nextTick(() => {
                if (this.morePopoverTrigger) {
                    this.morePopoverTrigger.focus();
                    this.morePopoverTrigger = null;
                }
            });
        },

        formatPopoverDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return new Intl.DateTimeFormat(this.getLocale(), {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            }).format(date);
        },

        // ==================== Multi-Day Event Helpers ====================

        isMultiDayEvent(event) {
            if (!event.end) return false;
            const startDate = this.getDatePart(event.start);
            const endDate = this.getDatePart(event.end);
            return startDate !== endDate;
        },

        isEventStart(event, dateString) {
            return this.getDatePart(event.start) === dateString;
        },

        isEventEnd(event, dateString) {
            if (!event.end) return true;
            return this.getDatePart(event.end) === dateString;
        },
    };
}
