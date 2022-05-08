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

    //calculate Ambient
    vec3 ambient_light = light_ambient*material_color;

    //calculate diffuse
    vec3 L = normalize(light_position - frag_pos); //light dirention 
    vec3 N = normalize(frag_normal);
    float diff = max(dot(N, L), 0.0);
    vec3 diffuse_light = diff * light_color;

    //calculate Specular 
    float specularStrength = 5.0;
    vec3 view_direction = normalize(camera_position - frag_pos);
    vec3 R = normalize(-reflect(L, N)); //vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(view_direction, R), 0.0),material_shininess);
    vec3 specular_light = specularStrength * spec * light_color;  

    vec3 lighting = (ambient_light + diffuse_light + specular_light) * material_color;
    FragColor = vec4(lighting, 1.0);

}