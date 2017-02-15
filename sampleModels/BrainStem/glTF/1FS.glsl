precision highp float;
uniform vec4 u_ambient;
uniform vec4 u_diffuse;
uniform vec4 u_emission;
uniform vec4 u_specular;
uniform float u_transparency;
varying vec3 v_position;
varying vec3 v_normal;
void main(void) {
    vec3 normal = normalize(v_normal);
    vec4 diffuse = u_diffuse;
    vec3 diffuseLight = vec3(0.0, 0.0, 0.0);
    vec3 emission = u_emission.rgb;
    vec3 ambient = u_ambient.rgb;
    vec3 viewDir = -normalize(v_position);
    vec3 ambientLight = vec3(0.0, 0.0, 0.0);
    ambientLight += vec3(0.2, 0.2, 0.2);
    vec3 l = vec3(0.0, 0.0, 1.0);
    diffuseLight += vec3(1.0, 1.0, 1.0) * max(dot(normal, l), 0.); 
    vec3 color = vec3(0.0, 0.0, 0.0);
    color += diffuse.rgb * diffuseLight;
    color += emission;
    color += ambient * ambientLight;
    gl_FragColor = vec4(color * diffuse.a * u_transparency, diffuse.a * u_transparency);
}
