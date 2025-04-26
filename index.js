export default {
  async fetch(request, env, ctx) {
    let cookieHeader = request.headers.get('Cookie') || "";

    let newCookieHeader = cookieHeader
      .split(';')
      .map(c => c.trim())
      .filter(c => !c.startsWith('test_sys='))
      .join('; ');

    let newHeaders = new Headers(request.headers);
    if (newCookieHeader) {
      newHeaders.set('Cookie', newCookieHeader);
    } else {
      newHeaders.delete('Cookie');
    }

    let modifiedRequest = new Request(request, { headers: newHeaders });

    return fetch(modifiedRequest);
  }
}
