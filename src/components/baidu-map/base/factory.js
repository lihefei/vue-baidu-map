export function createPoint(BMap, options) {
    return new BMap.Point(options.lng, options.lat);
}

export function createPixel(BMap, options) {
    let { x, y } = options;
    return new BMap.Pixel(x, y);
}

export function createSize(BMap, options) {
    const { width, height } = options;
    return new BMap.Size(width, height);
}

export function createIcon(BMap, options) {
    const { url, size, opts } = options;
    return new BMap.Icon(url, createSize(BMap, size), opts);
}

export function createBounds(BMap, options = {}) {
    const { sw, ne } = options;
    return new BMap.Bounds(createPoint(BMap, sw), createPoint(BMap, ne));
}

export function createLabel(BMap, options = {}) {
    let { content, opts } = options;
    return new BMap.Label(
        content,
        opts && {
            offset: opts.offset && createSize(BMap, opts.offset),
            position: opts.position && createPoint(BMap, opts.position),
            enableMassClear: massClear && opts.massClear
        }
    );
}
