#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;

void main() {

    vec3 L = normalize(light_ambient - frag_pos);

    vec3 R = normalize(-reflect(L, frag_normal));

    vec4 Ia = light_ambient;

    vec4 Id = (light_color*material_specular)*(R, normalize(light_position));

    vec4 Is = material_specular;


    FragColor = vec4(material_color, 1.0);
}
