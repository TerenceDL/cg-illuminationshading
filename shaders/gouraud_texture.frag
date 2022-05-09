#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;
in vec2 frag_texcoord;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks
uniform sampler2D image;        // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {

    vec3 colors = (material_color*ambient)+(material_color*diffuse)+(specular*material_specular);
    vec4 pixel_texture = texture(image, frag_texcoord);
    vec3 resualts = pixel_texture.rgb*colors;
    FragColor = vec4(resualts, 1.0);
}