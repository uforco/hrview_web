@Library("SharedLib") _
pipeline {
    agent any 

    environment {
        DEPLOY_ENV = 'production'
        SONAR_HOME = tool "Sonar"
        // PROJECT_NAME - Dynamic
        // VERSION - Dynamic
    }

    tools {
        nodejs 'Node22'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    gitclone("main", "https://github.com/uforco/hrview_web.git", "github_access") // frist param - branch name, 2nd param - git url, (3rd param public repo optinal / private repo requred with gitHub Access Credentials )
                }
            }
        }
        stage('setup ENV') {
            steps {
                script {
                    def pkg = readJSON file: 'package.json'
                    env.PROJECT_NAME = "${pkg.name}"
                    env.VERSION = "${pkg.version}"
                }
            }
        }
        stage('Unit Code Quality Checks'){
            parallel{
                stage('Install NPM dependences'){
                    steps {
                        sh 'npm install'
                    }
                }
                stage('Unit Lint Tests'){
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Trivy Filesystem Scan') {
                    steps {
                        sh '''
                            mkdir -p trivyReport

                            trivy fs \
                                --scanners vuln,secret,misconfig \
                                --skip-files "**/*.md" \
                                --skip-files Dockerfile \
                                --skip-files Jenkinsfile \
                                --skip-dirs "**/dist" \
                                --skip-dirs "**/node_modules" \
                                --skip-files pnpm-lock.yaml \
                                --skip-files package-lock.json \
                                --skip-files pnpm-workspace.yaml \
                                --severity HIGH,CRITICAL \
                                --exit-code 1 \
                                --format template \
                                --template "@trivyTemplate/html.tpl" \
                                -o "trivyReport/trivy-fs-report.html" \
                                .
                        '''
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'trivyReport',
                            reportFiles: "trivy-fs-report.html",
                            reportName: 'Trivy Filesystem Scan'
                        ])
                    }
                    post {
                        always {
                            archiveArtifacts artifacts: "trivyReport/trivy-fs-report.html", fingerprint: true
                        }
                    }
                }
            }
        }

        stage('SonarQube Quality Analysis') {
            steps {
                withSonarQubeEnv("SonerQubeServer"){
                    sh """
                        ${SONAR_HOME}/bin/sonar-scanner \
                          -Dsonar.projectKey=hrview \
                          -Dsonar.projectName=hrview \
                          -Dsonar.sources=. \
                          -Dsonar.sourceEncoding=UTF-8
                    """
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck(
                    odcInstallation: 'OWASP',
                    additionalArguments: '--scan ./'
                )
                dependencyCheckPublisher(
                    pattern: '**/dependency-check-report.xml'
                )
            }
        }
        // stage('docker images build'){
        //     steps {
        //         script {
        //             docker_build("${DOCKER_USER}", "${PROJECT_NAME}", "${VERSION}") // call(dockerHubUserName, imageName, imageTag)
        //         }
        //     }
        // }
        // stage('Deploy') {
        //     steps {
        //         withCredentials([
        //             sshUserPrivateKey(
        //                 credentialsId: 'vps-ssh',
        //                 keyFileVariable: 'SSH_KEY',
        //                 usernameVariable: 'SSH_USER'
        //             )
        //         ]) {
        //             sh '''
        //             ssh -i $SSH_KEY -o StrictHostKeyChecking=no \
        //                 $SSH_USER@YOUR_VPS_IP \
        //                 "docker ps"
        //             '''
        //         }
        //     }
        // }
    }
}